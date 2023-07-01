import { useRef } from "react";
import useOnScreen from "../hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarHashLink from "./SidebarHashLink";
import SpawnMemory1 from "../images/SpawnMemory3.png";
import BoxBounds from "../images/BoxBounds.png";
import OverlappingVerts from "../images/OverlappingVerts2.png";
import { BSCodeBlock, BSInlineCodeBlock } from "./CodeBlock";

const OnAudioAnalyzerBeat = `void ATargetManager::OnAudioAnalyzerBeat()
{
    if (!ShouldSpawn) return;

    if (!CurrentSpawnArea)
    {
        FindNextTargetProperties();
        return;
    }

    HandleActivateExistingTargets();

    if (BSConfig.TargetConfig.TargetSpawningPolicy == ETargetSpawningPolicy::RuntimeOnly)
    {
        HandleRuntimeSpawnAndActivation();
    }

    if (BSConfig.TargetConfig.RecentTargetMemoryPolicy == ERecentTargetMemoryPolicy::NumTargetsBased)
    {
        SpawnAreaManager->RefreshRecentFlags();
    }
}`;

const SpawnUpfrontOnlyTargets = `void ATargetManager::SpawnUpfrontOnlyTargets()
{
    if (BSConfig.TargetConfig.TargetDistributionPolicy == ETargetDistributionPolicy::Grid)
    {
        for (int i = 0; i < SpawnAreaManager->GetSpawnAreas().Num(); i++)
        {
            SpawnAreaManager->GetSpawnAreasRef()[i]->SetTargetScale(GetNextTargetScale());
            SpawnTarget(SpawnAreaManager->GetSpawnAreasRef()[i]);
        }

        FindNextTargetProperties();
    }
    else
    {
        for (int i = 0; i < BSConfig.TargetConfig.NumUpfrontTargetsToSpawn; i++)
        {
            FindNextTargetProperties();
            if (CurrentSpawnArea)
            {
                SpawnTarget(CurrentSpawnArea);
            }
        }
    }
}`;

const HandleActivateExistingTargets = `void ATargetManager::HandleActivateExistingTargets()
{
    if (GetManagedTargets().IsEmpty())
    {
        return;
    }

    // Persistant Targets are the only type that can always receive continuous activation
    if (BSConfig.TargetConfig.TargetDeactivationConditions.Contains(
        ETargetDeactivationCondition::Persistant))
    {
        HandlePermanentlyActiveTargetActivation();
        return;
    }

    // Check to see if there are any targets available to activate
    if (SpawnAreaManager->GetDeactivatedManagedSpawnAreas().IsEmpty())
    {
        return;
    }

    const int32 NumToActivate = GetNumberOfTargetsToActivate();

    // SpawnAreas referencing managed targets, but are not activated
    for (int i = 0; i < NumToActivate; i++)
    {
        if (BSConfig.TargetConfig.TargetSpawningPolicy == ETargetSpawningPolicy::UpfrontOnly)
        {
            if (CurrentSpawnArea)
            {
                if (ATarget* Target = FindManagedTargetByGuid(CurrentSpawnArea->GetTargetGuid()))
                {
                    if (ActivateTarget(Target))
                    {
                        FindNextTargetProperties();
                    }
                }
            }
        }
        else if (const USpawnArea* SpawnArea = SpawnAreaManager->FindOldestDeactivatedManagedSpawnArea())
        {
            if (ATarget* Target = FindManagedTargetByGuid(SpawnArea->GetTargetGuid()))
            {
                ActivateTarget(Target);
            }
        }
    }
}`;

const HandleRuntimeSpawnAndActivation = `void ATargetManager::HandleRuntimeSpawnAndActivation()
{
    int32 NumberToSpawn = GetNumberOfRuntimeTargetsToSpawn();
    int32 NumberToActivate = GetNumberOfTargetsToActivate();

    if (!BSConfig.TargetConfig.bAllowSpawnWithoutActivation)
    {
       	// Only spawn targets that can be activated
        if (NumberToSpawn > NumberToActivate)
        {
            NumberToSpawn = NumberToActivate;
        }
    }

    if (CurrentSpawnArea->IsCurrentlyManaged())
    {
        FindNextTargetProperties();
    }

    for (int i = 0; i < NumberToSpawn; i++)
    {
        if (ATarget* SpawnedTarget = SpawnTarget(CurrentSpawnArea))
        {
            if (NumberToActivate > 0)
            {
                ActivateTarget(SpawnedTarget);
                NumberToActivate--;
            }

            FindNextTargetProperties();
        }
    }
}`;

const ActivateTarget = `bool ATargetManager::ActivateTarget(ATarget* InTarget) const
{
    const FGuid Guid = SpawnAreaManager->FindSpawnAreaFromGuid(InTarget->GetGuid());
    if (!InTarget || !SpawnAreaManager->IsSpawnAreaValid(Guid))
    {
        return false;
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::AddImmunity))
    {
        InTarget->ApplyImmunityEffect();
    }
    else if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::RemoveImmunity))
    {
        InTarget->RemoveImmunityEffect();
    }
    else if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ToggleImmunity))
    {
        InTarget->IsTargetImmune() ? InTarget->RemoveImmunityEffect() : InTarget->ApplyImmunityEffect();
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeVelocity))
    {
        const float NewSpeed = FMath::FRandRange(BSConfig.TargetConfig.MinTargetSpeed, BSConfig.TargetConfig.MaxTargetSpeed)
        InTarget->SetTargetSpeed(NewSpeed);
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeDirection))
    {
        const FVector NewDirection = UKismetMathLibrary::GetDirectionUnitVector(InTarget->GetActorLocation(),
            GetRandomMovingTargetEndLocation(InTarget->GetActorLocation(), InTarget->GetTargetSpeed(), 
            InTarget->GetLastDirectionChangeHorizontal()));
        InTarget->SetTargetDirection(NewDirection);
        InTarget->SetLastDirectionChangeHorizontal(!InTarget->GetLastDirectionChangeHorizontal());
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeScale))
    {
        InTarget->SetSphereScale(GetNextTargetScale());
    }

    if (InTarget->ActivateTarget(BSConfig.TargetConfig.TargetMaxLifeSpan))
    {
        SpawnAreaManager->FlagSpawnAreaAsActivated(InTarget->GetGuid());
        OnTargetActivated.Broadcast();
        if (ReinforcementLearningComponent->IsActive() && SpawnAreaManager->IsSpawnAreaValid(PreviousSpawnArea))
        {
            ReinforcementLearningComponent->AddToActiveTargetPairs(PreviousSpawnArea->GetIndex(), CurrentSpawnArea->GetIndex());
        }

        return true;
    }

    return false;
}`;

const FindNextTargetProperties = `void ATargetManager::FindNextTargetProperties()
{
    const FVector NewScale = GetNextTargetScale();

    if (CurrentSpawnArea)
    {
        LastTargetSpawnedCenter = CurrentSpawnArea->GetChosenPoint().Equals(GetBoxOrigin());
       	// Assign CurrentSpawnArea address to PreviousSpawnArea just before finding CurrentSpawnArea
        PreviousSpawnArea = CurrentSpawnArea;
    }
    else
    {
        LastTargetSpawnedCenter = false;
        PreviousSpawnArea = nullptr;
    }

    CurrentSpawnArea = GetNextSpawnArea(BSConfig.TargetConfig.BoundsScalingPolicy, NewScale);
    if (CurrentSpawnArea && SpawnAreaManager->GetSpawnAreas().IsValidIndex(CurrentSpawnArea->GetIndex()))
    {
        CurrentSpawnArea->SetTargetScale(NewScale);
    }
}`;

const EGridIndexType = `UENUM(BlueprintType)
enum class EGridIndexType: uint8
{
    None UMETA(DisplayName = "None"),
        Corner_TopLeft UMETA(DisplayName = "Corner_TopLeft"),
        Corner_TopRight UMETA(DisplayName = "Corner_TopRight"),
        Corner_BottomRight UMETA(DisplayName = "Corner_BottomRight"),
        Corner_BottomLeft UMETA(DisplayName = "Corner_BottomLeft"),
        Border_Top UMETA(DisplayName = "Border_Top"),
        Border_Right UMETA(DisplayName = "Border_Right"),
        Border_Bottom UMETA(DisplayName = "Border_Bottom"),
        Border_Left UMETA(DisplayName = "Border_Left"),
        Middle UMETA(DisplayName = "Middle"),
};
`;

const GetValidSpawnLocations = `TArray<FVector> USpawnAreaManagerComponent::
GetValidSpawnLocations(const FVector& Scale, const FExtrema& InCurrentExtrema, const USpawnArea* CurrentSpawnArea) const
{
    TArray<FVector> ValidSpawnLocations;
    switch (BSConfig.TargetConfig.TargetDistributionPolicy)
    {
        case ETargetDistributionPolicy::EdgeOnly:
            HandleEdgeOnlySpawnLocations(ValidSpawnLocations, InCurrentExtrema);
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            RemoveSharedVertices(ValidSpawnLocations, InCurrentExtrema);
            break;
        case ETargetDistributionPolicy::FullRange:
            HandleFullRangeSpawnLocations(ValidSpawnLocations, InCurrentExtrema);
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            RemoveSharedVertices(ValidSpawnLocations, InCurrentExtrema);
            break;
        case ETargetDistributionPolicy::Grid:
            HandleGridSpawnLocations(ValidSpawnLocations, CurrentSpawnArea);
            break;
        case ETargetDistributionPolicy::None:
        case ETargetDistributionPolicy::HeadshotHeightOnly:
            ValidSpawnLocations = GetAllBottomLeftVertices();
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            RemoveSharedVertices(ValidSpawnLocations, InCurrentExtrema);
            break;
    }

    return ValidSpawnLocations;
}`;

const SpawnTarget = `ATarget* ATargetManager::SpawnTarget(USpawnArea* InSpawnArea)
{
    if (!InSpawnArea)
    {
        return nullptr;
    }

    ATarget* Target = GetWorld()->SpawnActorDeferred<ATarget> (TargetToSpawn,
        FTransform(FRotator::ZeroRotator, InSpawnArea->GetChosenPoint(), InSpawnArea->GetTargetScale()),
        this, nullptr, ESpawnActorCollisionHandlingMethod::AlwaysSpawn);
    Target->InitTarget(BSConfig.TargetConfig);
    Target->FinishSpawning(FTransform(), true);
    Target->OnTargetDamageEventOrTimeout.AddDynamic(this, &ATargetManager::OnTargetHealthChangedOrExpired);
    InSpawnArea->SetTargetGuid(Target->GetGuid());
    AddToManagedTargets(Target, InSpawnArea);
    return Target;
}`;

const RemovingOverlappingSpawnLocations = `void USpawnAreaManagerComponent::RemoveOverlappingSpawnLocations(TArray<FVector>& SpawnLocations, const FVector& Scale) const
{
    TArray<FVector> OverlappingVertices;
    for (const USpawnArea* SpawnArea: GetActivatedOrRecentSpawnAreas())
    {
       	// Regenerate Overlapping vertices if necessary
        if (Scale.Length() > SpawnArea->GetTargetScale().Length())
        {
            TArray<FVector> TempOverlappingVertices = SpawnArea->GenerateOverlappingVertices(
                BSConfig.TargetConfig.MinDistanceBetweenTargets, MinOverlapRadius, SpawnArea->GetTargetScale());
            for (const FVector& Vector: TempOverlappingVertices)
            {
              OverlappingVertices.AddUnique(Vector);
            }
        }
        else
        {
            for (const FVector& Vector: SpawnArea->GetOverlappingVertices())
            {
                OverlappingVertices.AddUnique(Vector);
            }
        }
    }

    SpawnLocations = SpawnLocations.FilterByPredicate([&OverlappingVertices] (const FVector& Location)
    {
        return OverlappingVertices.Contains(Location) ? false : true;
    });
}`;

const HandleDeactivation = `void ATarget::HandleDeactivationResponses(const bool bExpired)
{
    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::RemoveImmunity))
    {
        RemoveImmunityEffect();
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::AddImmunity))
    {
        ApplyImmunityEffect();
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ToggleImmunity))
    {
        IsTargetImmune() ? RemoveImmunityEffect() : ApplyImmunityEffect();
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetScale))
    {
        SetSphereScale(InitialTargetScale);
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ApplyDeactivatedTargetScaleMultiplier))
    {
        SetSphereScale(GetCurrentTargetScale() * Config.ConsecutiveChargeScaleMultiplier);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetPosition))
    {
        SetActorLocation(InitialTargetLocation);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ShrinkQuickGrowSlow) && !bExpired)
    {
        PlayShrinkQuickAndGrowSlowTimeline();
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::PlayExplosionEffect) && !bExpired)
    {
        PlayExplosionEffect(SphereMesh->GetComponentLocation(), SphereTargetRadius * GetCurrentTargetScale().X, ColorWhenDestroyed);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetColorToInactiveColor))
    {
        SetSphereColor(Config.InactiveTargetColor);
    }
}`;

const DevBlog = () => {
  const articlePath = "/devblog/target-spawning-system";

  const Ref_Classes = useRef(null);
  const Ref_USpawnArea = useRef(null);
  const Ref_ATargetManager = useRef(null);
  const Ref_UBoxComponent = useRef(null);
  const Ref_UReinforcementLearningComponent = useRef(null);
  const Ref_USpawnAreaManagerComponent = useRef(null);
  const Ref_ATarget = useRef(null);
  const Ref_UProjectileMovementComponent = useRef(null);
  const Ref_UBSAbilitySystemComponent = useRef(null);
  const Ref_UBSHealthComponent = useRef(null);
  const Ref_ABSGameMode = useRef(null);

  const Ref_TargetLifeCycle = useRef(null);
  const Ref_Initialization = useRef(null);
  const Ref_Spawning = useRef(null);
  const Ref_Activation = useRef(null);
  const Ref_Deactivation = useRef(null);
  const Ref_Destruction = useRef(null);

  const onScreen_Classes = useOnScreen(Ref_Classes);
  const onScreen_USpawnArea = useOnScreen(Ref_USpawnArea);
  const onScreen_ATargetManager = useOnScreen(Ref_ATargetManager);
  const onScreen_UBoxComponent = useOnScreen(Ref_UBoxComponent);
  const onScreen_UReinforcementLearningComponent = useOnScreen(Ref_UReinforcementLearningComponent);
  const onScreen_USpawnAreaManagerComponent = useOnScreen(Ref_USpawnAreaManagerComponent);
  const onScreen_ATarget = useOnScreen(Ref_ATarget);
  const onScreen_UProjectileMovementComponent = useOnScreen(Ref_UProjectileMovementComponent);
  const onScreen_UBSAbilitySystemComponent = useOnScreen(Ref_UBSAbilitySystemComponent);
  const onScreen_UBSHealthComponent = useOnScreen(Ref_UBSHealthComponent);
  const onScreen_ABSGameMode = useOnScreen(Ref_ABSGameMode);
  const onScreen_TargetLifeCycle = useOnScreen(Ref_TargetLifeCycle);
  const onScreen_Initialization = useOnScreen(Ref_Initialization);
  const onScreen_Spawning = useOnScreen(Ref_Spawning);
  const onScreen_Activation = useOnScreen(Ref_Activation);
  const onScreen_Deactivation = useOnScreen(Ref_Deactivation);
  const onScreen_Destruction = useOnScreen(Ref_Destruction);

  return (
    <div className="flex-container-column">
      <div className="hero-container">
        <div className="hero">
          <h1 className="">A look into BeatShot's target spawning system</h1>
          <p className="hero-lead">
            How are spawn locations decided for targets? How are targets managed? This post goes into detail about how
            this is accomplished in Unreal.
          </p>
          <img className="hero-image" src={SpawnMemory1} alt="logo" />
        </div>
      </div>
      <div className="flex-container-row">
        <div className="sidebar-container left">
          <div className="sidebar-main">
            <ul>
              <li>
                <SidebarHashLink
                  path={articlePath}
                  hash={`#classes-header`}
                  text="Classes"
                  onScreen={onScreen_Classes}
                  topLevel={true}
                />
                <ul>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-USpawnArea`}
                      text="Spawn Area"
                      onScreen={onScreen_Classes && onScreen_USpawnArea}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ATargetManager`}
                      text="Target Manager"
                      onScreen={onScreen_Classes && !onScreen_USpawnArea && onScreen_ATargetManager}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBoxComponent`}
                          text="Box Components"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_USpawnArea &&
                            onScreen_ATargetManager &&
                            onScreen_UBoxComponent
                          }
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UReinforcementLearningComponent`}
                          text="Reinforcement Learning Component"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_USpawnArea &&
                            onScreen_ATargetManager &&
                            !onScreen_UBoxComponent &&
                            onScreen_UReinforcementLearningComponent
                          }
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-USpawnAreaManagerComponent`}
                          text="Spawn Area Manager Component"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_USpawnArea &&
                            onScreen_ATargetManager &&
                            !onScreen_UReinforcementLearningComponent &&
                            onScreen_USpawnAreaManagerComponent
                          }
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ATarget`}
                      text="Target"
                      onScreen={onScreen_Classes && !onScreen_ATargetManager && onScreen_ATarget}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UProjectileMovementComponent`}
                          text="Projectile Movement Component"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_ATargetManager &&
                            onScreen_ATarget &&
                            onScreen_UProjectileMovementComponent
                          }
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBSAbilitySystemComponent`}
                          text="Ability System Component"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_ATargetManager &&
                            onScreen_ATarget &&
                            !onScreen_UProjectileMovementComponent &&
                            onScreen_UBSAbilitySystemComponent
                          }
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBSHealthComponent`}
                          text="Health Component"
                          onScreen={
                            onScreen_Classes &&
                            !onScreen_ATargetManager &&
                            onScreen_ATarget &&
                            !onScreen_UBSAbilitySystemComponent &&
                            onScreen_UBSHealthComponent
                          }
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ABSGameMode`}
                      text="BSGameMode"
                      onScreen={onScreen_Classes && !onScreen_ATarget && onScreen_ABSGameMode}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <SidebarHashLink
                  path={articlePath}
                  hash={`#target-lifecycle`}
                  text="Target Lifecycle"
                  onScreen={!onScreen_Classes && onScreen_TargetLifeCycle}
                  topLevel={true}
                />
                <ul>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#target-lifecycle-Initialization`}
                      text="Initialization"
                      onScreen={!onScreen_Classes && onScreen_TargetLifeCycle && onScreen_Initialization}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#target-lifecycle-Spawning`}
                      text="Spawning"
                      onScreen={
                        !onScreen_Classes && onScreen_TargetLifeCycle && !onScreen_Initialization && onScreen_Spawning
                      }
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#target-lifecycle-Activation`}
                      text="Activation"
                      onScreen={
                        !onScreen_Classes &&
                        onScreen_TargetLifeCycle &&
                        !onScreen_Initialization &&
                        !onScreen_Spawning &&
                        onScreen_Activation
                      }
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#target-lifecycle-Deactivation`}
                      text="Deactivation"
                      onScreen={
                        !onScreen_Classes &&
                        onScreen_TargetLifeCycle &&
                        !onScreen_Initialization &&
                        !onScreen_Spawning &&
                        !onScreen_Activation &&
                        onScreen_Deactivation
                      }
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#target-lifecycle-Destruction`}
                      text="Destruction"
                      onScreen={
                        !onScreen_Classes &&
                        onScreen_TargetLifeCycle &&
                        !onScreen_Initialization &&
                        !onScreen_Spawning &&
                        !onScreen_Activation &&
                        !onScreen_Deactivation &&
                        onScreen_Destruction
                      }
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <article className="flex-container-column" id="article">
          <div className="article-section" ref={Ref_Classes} id="classes-header">
            <div className="article-section-header">
              <h1 className="text-light">Classes</h1>
            </div>
            <div className="article-subsection" ref={Ref_USpawnArea} id="classes-USpawnArea">
              <div className="article-subsection-header">
                <span className="line" />
                <div className="inline">
                  <h2 className="inline-code-header">
                    <BSInlineCodeBlock code={"USpawnArea"} padding={"0 0.1em"} />
                  </h2>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UObject"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
              </div>
              <div>
                <p>
                  Target spawn locations are chosen from a 2-D rectangle that I'll be referring to as the total spawn
                  area. The total spawn area dimensions are the Horizontal/Vertical Spread (custom game mode options).
                  The dimensions correspond to the actual size in Unreal units, and when maxed out represent 3.2 million
                  individual points.
                </p>
                <p>
                  I needed to find a way to keep track of target locations and the total area that they occupied.
                  Iterating through 3.2 million points isn't even an option, so the total two-dimensional spawn
                  rectangle is broken into the smaller rectangles, where each one is represented by a SpawnArea.
                </p>
                <ul>
                  Each SpawnArea contains:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    info about the area it represents
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    info about the targets that have spawned within it, such as the scale the target spawned with and
                    its global unique identifier
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    flags that indicate if a target in its area is activated, deactivated, or if its only holding the
                    location (target is no longer visible, but still not allowed to spawn there)
                  </li>
                </ul>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_ATargetManager} id="classes-ATargetManager">
              <div className="article-subsection-header">
                <span className="line" />
                <div className="inline">
                  <h2 className="inline-code-header">
                    <BSInlineCodeBlock code={"ATargetManager"} padding={"0 0.1em"} />
                  </h2>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"AActor"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <p>
                  The Target Manager is the actor primarily responsible for spawning, holding references to, and
                  destroying target actors. It calls <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"Activate"} color={"rgb(80, 250, 123)"} padding={"0"} /> and{" "}
                  <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"Deactivate"} color={"rgb(80, 250, 123)"} padding={"0"} /> on the targets.
                </p>
              </div>
              <div ref={Ref_UBoxComponent} id="classes-UBoxComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"UBoxComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UShapeComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>The Target Manager uses seven box components that are all basically just planes.</p>
                  <p>
                    The first box/plane (middle red in the image below) corresponds to the total 2-D area encompassed by
                    all USpawnAreas.
                  </p>
                  <p>
                    The other six form a rectangular prism (spawn volume) used to confine moving targets. I would've
                    preferred to only use one box component, but "hollow collision" is not a thing. The front & back red
                    planes, green planes, and blue planes are these six. They form a perfect cube, but are offset in the
                    image for visiblity.
                  </p>
                  <figure>
                    <div className="img-wrapper">
                      <img src={BoxBounds} alt="BoxBounds" />
                    </div>
                    <figcaption>Target Manager Box Components</figcaption>
                  </figure>
                </div>
              </div>
              <div ref={Ref_UReinforcementLearningComponent} id="classes-UReinforcementLearningComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"UReinforcementLearningComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UActorComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>
                    The Reinforcement Learning Component (RL Component) is an opt-in option available to custom game
                    modes (Enable AI).
                  </p>
                  <p>
                    It uses the Q-Learning algorithm to find the target spawn location that the player is least likely
                    to successfully destroy based on past performance.
                  </p>
                  <p>
                    The component uses a 2D array where each element in the array represents the reward from having
                    spawned a target at location A and immediately spawning a target at location B. A simpler approach
                    would be to only consider the reward for spawning a target a location B, but using the previous
                    spawn location generates much better predictions, even though it takes longer to train the model. It
                    always scales the total spawn area down to a 5x5 grid, meaning that the 2D array will always have
                    625 elements (the simpler approach would only be 25).
                  </p>
                </div>
              </div>
              <div ref={Ref_USpawnAreaManagerComponent} id="classes-USpawnAreaManagerComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UActorComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>The SpawnArea Manager creates and manages all the SpawnArea objects.</p>
                  <p>
                    It calculates the size that all SpawnAreas are set to, with the main limiting factor being that RL
                    Component is always a 5x5 grid. This means that the number of horizontal and vertical SpawnAreas
                    must also be in multiples of five, though they can be different.
                  </p>
                  <p>
                    Why use a component? A lot of functions are required to interact with SpawnArea objects, so it made
                    sense to encapsulate all the functionality into a component.
                  </p>
                </div>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_ATarget} id="classes-ATarget">
              <div className="article-subsection-header">
                <span className="line" />
                <div className="inline">
                  <h2 className="inline-code-header">
                    <BSInlineCodeBlock code={"ATarget"} padding={"0 0.1em"} />
                  </h2>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"AActor"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <p>
                  While the Target Manager activates the targets, the target itself is responsible for determine when it
                  should deactivate, what it should do when it deactivates, and when (if ever) it should destroy itself.
                  It broadcasts information to the Target Manager when it takes damage from a player or if it damages
                  itself. The class has several important components that help game modes run smoothly.
                </p>
              </div>
              <div ref={Ref_UProjectileMovementComponent} id="classes-UProjectileMovementComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"UProjectileMovementComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UMovementComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>
                    The Projectile Movement Component is used to automate moving targets. The Target Manager calls{" "}
                    <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"SetTargetSpeed"} color={"rgb(80, 250, 123)"} padding={"0"} /> and{" "}
                    <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"SetTargetDirection"} color={"rgb(80, 250, 123)"} padding={"0"} /> when it
                    wants to change the velocity or direction.{" "}
                    <BSInlineCodeBlock code={"UProjectileMovementComponent"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"OnProjectileBounce"} color={"rgb(80, 250, 123)"} padding={"0"} /> is a
                    function that is overriden to retain the same velocity that the target had prior to bouncing into
                    something.
                  </p>
                </div>
              </div>
              <div ref={Ref_UBSAbilitySystemComponent} id="classes-UBSAbilitySystemComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"UBSAbilitySystemComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UAbilitySystemComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>
                    It might've been overkill to use this for each target, but it works well since characters also use
                    the Ability System Component (ASC), enabling communication between their ASC and the target ASC.
                  </p>
                  <p>
                    The ASC enables us to apply immunity to the target for the different damage types (and control them
                    independently) and has built in support for tracking attributes like health.
                  </p>
                  <p>
                    Sidenote: The ASC comes from the Gameplay Ability System plugin (GAS) by Unreal. I might do a
                    seperate article covering more about GAS, but for now I'll only discuss the relvant parts.
                  </p>
                </div>
              </div>
              <div ref={Ref_UBSHealthComponent} id="classes-UBSHealthComponent">
                <span className="line" />
                <div className="inline">
                  <h3 className="inline-code-header">
                    <BSInlineCodeBlock code={"UBSHealthComponent"} padding={"0 0.1em"} />
                  </h3>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"UActorComponent"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <div>
                  <p>
                    The health component listens for changes in the target ASC's health attribute. It does this by
                    binding to the ability system component's GameplayAttributeValueChangeDelegate
                  </p>
                </div>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_ABSGameMode} id="classes-ABSGameMode">
              <div className="article-subsection-header">
                <span className="line" />
                <div className="inline">
                  <h2 className="inline-code-header">
                    <BSInlineCodeBlock code={"ABSGameMode"} padding={"0 0.1em"} />
                  </h2>
                  <h4 className="inline vert-align-middle"> &#40;inherits from </h4>
                  <h4 className="inline-code-header">
                    {" "}
                    <BSInlineCodeBlock code={"AGameMode"} padding={"0 0.1em"} />
                  </h4>
                  <h4 className="inline vert-align-middle">&#41;</h4>
                </div>
                <span className="line" />
                <p>
                  ABSGameMode spawns and intializes new ATargetManager each time a game mode is started. It also
                  configures the audio analyzer and notifies ATargetManager every time the beat threshold is met.
                </p>
              </div>
            </div>
          </div>
          <div className="article-section" ref={Ref_TargetLifeCycle} id="target-lifecycle">
            <div className="article-section-header">
              <h1 className="text-light">Target Lifecycle</h1>
              <p>
                Every <BSInlineCodeBlock code={"ATarget"} padding={"0"} /> goes through the same lifecycle of spawning,
                activation, deactivation, and destruction. Before discussing those events, I'll describe the
                initialization process that the involved actors go through.
              </p>
            </div>
            <div className="article-subsection" ref={Ref_Initialization} id="target-lifecycle-Initialization">
              <div className="article-subsection-header">
                <span className="line" />
                <h2 className="text-light">Initialization</h2>
                <span className="line" />
              </div>
              <div id="target-lifecycle-TargetManager">
                <span className="line" />
                <h4 className="text-light">Target Manager</h4>
                <span className="line" />
                <div>
                  <p>
                    When you first load into the map, the game mode spawns the Target Manager and passes the game mode
                    configuration to it. It then passes the relevant configuration settings to each of its components
                    inside <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} />.
                  </p>
                  <ol>
                    <li>Sets the dimensions of all box components</li>
                    <li>
                      Calls <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                      <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                      <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} />
                    </li>
                    <li>
                      Calls <BSInlineCodeBlock code={"UReinforcementLearningComponent"} padding={"0"} />
                      <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                      <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} />
                    </li>
                  </ol>
                </div>
              </div>
              <div id="target-lifecycle-SpawnAreaManager">
                <span className="line" />
                <h4 className="text-light">SpawnArea Manager</h4>
                <span className="line" />
                <div>
                  <p>
                    After receiving the game mode config from the Target Manager,{" "}
                    <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"InitializeSpawnAreas"} color={"rgb(80, 250, 123)"} padding={"0"} /> is
                    called to generate all SpawnAreas for the game mode. This is where the SpawnArea Manager determines
                    how many SpawnAreas the total spawn area needs to be divided into. This happens inside{" "}
                    <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"SetSpawnMemoryValues"} color={"rgb(80, 250, 123)"} padding={"0"} /> . Once
                    the width and height of the SpawnAreas are found, the SpawnArea Manager creates a new USpawnArea
                    object for each section of the total spawn area. It then calls{" "}
                    <BSInlineCodeBlock code={"USpawnArea"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} />, which sets up basic
                    information about the SpawnArea. More notably, it also specifies which type of section inside the
                    total spawn area it belongs to, represented by EGridIndexType:
                  </p>
                  <BSCodeBlock code={EGridIndexType} language={"c"} showLineNumbers={false} fontSize="0.65rem" />
                  <p>
                    The SpawnArea then finds all adjacent SpawnAreas based on the Grid Index Type and the number of
                    horizontal SpawnAreas that make up the total spawn area. The Grid Index Type allows the Grid Target
                    Distribution Policy to quickly access all adjacent SpawnAreas, which is how BeatGrid finds targets
                    to activate.
                  </p>
                  <p>
                    The SpawnArea then finds all adjacent SpawnAreas based on the Grid Index Type and the number of
                    horizontal SpawnAreas that make up the total spawn area. The Grid Index Type allows the Grid Target
                    Distribution Policy to quickly access all adjacent SpawnAreas, which is how BeatGrid finds targets
                    to activate. Any targets that need to be spawned upfront (
                    <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                    <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                    <BSInlineCodeBlock code={"UpfrontOnly"} color={"rgb(241, 250, 140)"} padding={"0"} />) are spawned
                    at this point.
                  </p>
                  <BSCodeBlock
                    code={SpawnUpfrontOnlyTargets}
                    language={"c"}
                    showLineNumbers={false}
                    fontSize="0.65rem"
                  />
                </div>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_Spawning} id="target-lifecycle-Spawning">
              <span className="line" />
              <h2 className="text-light">Spawning</h2>
              <span className="line" />
              <div>
                <p>
                  There are two spawning methods in BeatShot:{" "}
                  <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"UpfrontOnly"} color={"rgb(241, 250, 140)"} padding={"0"} /> and{" "}
                  <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"RuntimeOnly"} color={"rgb(241, 250, 140)"} padding={"0"} />. Game modes
                  using <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"RuntimeOnly"} color={"rgb(241, 250, 140)"} padding={"0"} /> spawn all
                  targets for the game mode inside <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} />. No other targets are
                  spawned for the duration of the game mode. Game modes using{" "}
                  <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"RuntimeOnly"} color={"rgb(241, 250, 140)"} padding={"0"} /> spawn their
                  targets based on beat thresholds being met by the audio analyzer, which triggers the game mode to call{" "}
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"OnAudioAnalyzerBeat"} color={"rgb(80, 250, 123)"} padding={"0"} />. I
                  discuss this function more in the next section, but for now I want to focus on what happens when any
                  target is spawned, regardless of the Target Spawning Policy.
                </p>
                <BSCodeBlock code={SpawnTarget} fontSize="0.65rem" />
                <p>
                  The location and scale of the target are retrieved from a previously found SpawnArea. I use
                  SpawnActorDeferred so the game mode config can be passed to the target before it's finished spawning.
                </p>
                <p>
                  <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"Init"} color={"rgb(80, 250, 123)"} padding={"0"} /> sets the max health
                  attribute of the target and provides all the information the target needs about the game mode. The
                  Target Manager binds to the target's OnTargetDamageEventOrTimeout delegate, which broadcast when the
                  health of the target is changed. This delegate is discussed more in the Deactivation section.
                </p>
                <p>
                  The SpawnArea is assigned the target's global unique identifier, the target is added to the Target
                  Manager's array of managed targets, and{" "}
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"FlagSpawnAreaAsManaged"} color={"rgb(80, 250, 123)"} padding={"0"} /> is
                  called. This lets the Spawn Area Manager know that the SpawnArea now represents a target.
                </p>
                <p>
                  When a SpawnArea is flagged as managed, <BSInlineCodeBlock code={"USpawnArea"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"GenerateOverlappingVertices"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  is called. This function finds all SpawnArea corner vertices inside a sphere with twice the radius of
                  the current target (purple wireframe spheres show in image below). The red and green points in the
                  image below represent the bottom left vertex of one individual SpawnArea. The green points mean that
                  it's currently safe to spawn a target in that SpawnArea, while the red points mean it's not. Each time
                  a new target occupies a given SpawnArea, these vertices generated and stored. They are then used when
                  finding subsequent target spawn locations.
                </p>
                <figure>
                  <div className="img-wrapper">
                    <img src={OverlappingVerts} alt="OverlappingVerts" />
                  </div>
                  <figcaption>Overlapping Vertices</figcaption>
                </figure>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_Activation} id="target-lifecycle-Activation">
              <span className="line" />
              <h2 className="text-light">Activation</h2>
              <span className="line" />
              <div>
                <p>
                  The chain of events leading to target activation begins when the game mode recieves input from the
                  audio analyzer that the beat threshold has been met, and calls{" "}
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"OnAudioAnalyzerBeat"} color={"rgb(80, 250, 123)"} padding={"0"} />. If using
                  a song from a file, this would occur exactly Spawn Beat Delay seconds before you actually hear the
                  beat.
                </p>
                <BSCodeBlock code={OnAudioAnalyzerBeat} fontSize="0.65rem" />
                <p>
                  The TargetManager looks for any existing target(s) that can be activated, and tries to activate them
                  according to the game mode config using <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"HandleActivateExistingTargets"} color={"rgb(80, 250, 123)"} padding={"0"} />
                  .
                </p>
                {/* <BSCodeBlock code={HandleActivateExistingTargets} fontSize="0.65rem" /> */}
                <p>
                  If the game mode config allows for targets to be spawned at runtime (
                  <BSInlineCodeBlock code={"ETargetSpawningPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"RuntimeOnly"} color={"rgb(241, 250, 140)"} padding={"0"} />
                  ), <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"HandleRuntimeSpawnAndActivation"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  is called.
                </p>
                {/* <BSCodeBlock code={HandleRuntimeSpawnAndActivation} fontSize="0.65rem" /> */}
                <p>
                  In both of these functions, the general procedure is to call{" "}
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"ActivateTarget"} color={"rgb(80, 250, 123)"} padding={"0"} /> and then call{" "}
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"FindNextTargetProperties"} color={"rgb(80, 250, 123)"} padding={"0"} /> if
                  it was successfully activated. The Target Manager handles all Target Activation Responses, while each
                  target handles their own Target Deactivation Responses & Target Destruction Conditions.
                </p>
                <BSCodeBlock code={ActivateTarget} language={"c"} showLineNumbers={false} fontSize="0.65rem" />
                <p>
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"FindNextTargetProperties"} color={"rgb(80, 250, 123)"} padding={"0"} />{" "}
                  finds the scale and SpawnArea for the next target. The only two SpawnAreas that the TargetManager
                  keeps track of are the PreviousSpawnArea and the CurrentSpawnArea. The only place these two variables
                  are changed is inside this function, and this function is always called immediately after activating a
                  target.
                </p>
                <BSCodeBlock code={FindNextTargetProperties} fontSize="0.65rem" />
                <p>
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"GetNextTargetScale"} color={"rgb(80, 250, 123)"} padding={"0"} /> returns
                  either a random target scale between the Min and Max Target Scale or a dynamic target scale taken from
                  a curve based on the number of recent targets successfully destroyed. The SpawnArea containing the
                  next target location is found using <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"GetNextSpawnArea"} color={"rgb(80, 250, 123)"} padding={"0"} />.
                </p>
                <p>
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"GetNextSpawnArea"} color={"rgb(80, 250, 123)"} padding={"0"} /> goes through
                  several checks to see if it can spawn at the origin or get a SpawnArea from the RLComponent, but the
                  main thing I want to focus on is when it calls{" "}
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"GetValidSpawnLocations"} color={"rgb(80, 250, 123)"} padding={"0"} />. This
                  function is the heart of spawn location decision making.
                </p>
                <BSCodeBlock code={GetValidSpawnLocations} fontSize="0.65rem" />
                <p>
                  The game mode config's Target Distribution Policy dictates which series of functions are executed.
                  Most distribution policies begin considering all SpawnAreas as valid choices, rather than only finding
                  SpawnAreas that aren't currently activated or recent. This is because a smaller target may spawn
                  before a larger target, and the cutout size of the sphere it left will not be big enough to safely the
                  next larger target without overlapping the smaller one. This is also why the target scale is found
                  before finding the SpawnArea.
                </p>
                <p>
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"HandleFullRangeSpawnLocations"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  gets the bottom left world location of all SpawnAreas and compares it against the current size of the
                  total spawn area. If the location of a SpawnArea falls outside the total spawn area, it is removed
                  from consideration. All the red boxes in the image below outside the the current spawn area (blue box)
                  are the SpawnAreas this function removed from consideration.
                </p>
                <p>
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"HandleEdgeOnlySpawnLocations"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  only adds the points along the border of the current total spawn area.
                </p>
                <p>
                  All Target Distribution Policies besides Grid call{" "}
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"RemoveOverlappingSpawnLocations"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />
                  . This function loops over all SpawnAreas that are flagged as Activated or Recent and adds their
                  overlapping vertices to a temporary array that is used to filter the SpawnLocations passed by
                  reference to the function.
                </p>
                <p>
                  The overlapping vertices that are added are the same overlapping vertices that were generated when the
                  target was spawned. If the scale for the target to be spawned is greater than the scale that the
                  overlapping points were generated with, a temporary set is generated using the larger radius.
                </p>
                <BSCodeBlock code={RemovingOverlappingSpawnLocations} fontSize="0.65rem" />
                <p>
                  As soon as the target is activated by the Target Manager, the timelines that control the color and/or
                  scale of the target begin playing and a timer is set for the duration of its Max Lifespan. If the
                  timer is allowed to expire, the target damages itself using a{" "}
                  <BSInlineCodeBlock code={"UGameplayEffect"} padding={"0"} /> that applies damage equal to the
                  Expiration Health Penalty.
                </p>
              </div>
            </div>
            <div className="article-subsection" ref={Ref_Deactivation} id="target-lifecycle-Deactivation">
              <span className="line" />
              <h2 className="text-light">Deactivation</h2>
              <span className="line" />
              <div>
                <p>
                  The catalyst for deactivation is the target's health attribute changing. Any time this occurs, the
                  OnTargetDamageEventOrTimeout delegate introduced in the Spawning section is broadcast to the Target
                  Manager.
                </p>
                <ul>
                  This delegate sends a struct containing the following:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Current health of the target
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Global unique identifier for the target
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    How far into the target's Max Lifespawn the target was destroyed. The value will be -1 if the target
                    expired. This is mostly used for scoring
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    How much health the target lost from this instance of damage
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    How the target lost health (player damage or self-inflicted)
                  </li>
                </ul>
                <p>
                  <BSInlineCodeBlock code={"ATargetManager"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"OnTargetHealthChangedOrExpired"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  is the function that all targets broadcast the delegate to.
                </p>
                <p>
                  First, the Target Manager updates the consecutive targets hit and adjusts the dynamic scale factor. This
                  value controls the target scale if using{" "}
                  <BSInlineCodeBlock code={"EConsecutiveTargetScalePolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"SkillBased"} color={"rgb(241, 250, 140)"} padding={"0"} /> and the total
                  spawn area if using <BSInlineCodeBlock code={"EBoundsScalingPolicy"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"Dynamic"} color={"rgb(241, 250, 140)"} padding={"0"} />. The struct is then
                  forwarded to the game mode which updates score values and the player HUD. The target is removed from
                  the Target Manager's managed target array if the Target Destruction Conditions permit. Any time a
                  target is removed from this array,{" "}
                  <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"RemoveManagedFlagFromSpawnArea"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  is also called.
                </p>
                <p>
                  Next, if the game mode uses the RL Component, the reward for the previous-current target location pair is
                  updated.
                </p>
                <p>
                  Then, <BSInlineCodeBlock code={"USpawnAreaManagerComponent"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock code={"HandleRecentTargetRemoval"} color={"rgb(80, 250, 123)"} padding={"0"} /> is
                  called. This function removes the Activated flag from the SpawnArea and flags it as Recent. A timer is
                  set based on the Recent Target Memory Policy and the Recent flag is then removed when the timer
                  expires. Upon removal of the Recent flag, the overlapping vertices that were generated when the target was
                  spawned are emptied.
                </p>
                <p>
                  Finally, the target then checks its Target Deactivation Conditions to see if it should deactivate. Deactivation
                  conditions are solely based on whether or not the target expired. If a deactivation condition was met,{" "}
                  <BSInlineCodeBlock code={"ATarget"} padding={"0"} />
                  <BSInlineCodeBlock code={"::"} color={"white"} padding={"0"} />
                  <BSInlineCodeBlock
                    code={"HandleDeactivationResponses"}
                    color={"rgb(80, 250, 123)"}
                    padding={"0"}
                  />{" "}
                  is called.
                </p>
                <BSCodeBlock code={HandleDeactivation} fontSize="0.65rem" />
              </div>
            </div>
            <div className="article-subsection" ref={Ref_Destruction} id="target-lifecycle-Destruction">
              <span className="line" />
              <h2 className="text-light">Destruction</h2>
              <span className="line" />
              <div>
                <p>
                  Just after checking deactivation conditions and broadcasting the OnTargetDamageEventOrTimeout
                  delegate, the target checks the Target Destruction Conditions to see if it needs to destroy itself.
                  <ol>
                    Destruction conditions are based on a combination of only two factors:
                    <li>If the target expired or did not expire</li>
                    <li>If the target's currently health is zero</li>
                  </ol>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DevBlog;
