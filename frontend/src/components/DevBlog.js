import { useRef } from "react";
import useOnScreen from "../hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarHashLink from "./SidebarHashLink";
import SpawnMemory1 from "../images/SpawnMemory3.png";
import BoxBounds from "../images/BoxBounds.png";
import { BSCodeBlock, BSInlineCodeBlock } from "./CodeBlock";

const GetValidSpawnLocations = `TArray<FVector> USpawnAreaManagerComponent::GetValidSpawnLocations(const FVector& Scale, 
  const FExtrema& InCurrentExtrema, const USpawnArea* CurrentSpawnArea) const
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
  default:
    ValidSpawnLocations = GetAllBottomLeftVertices();
    RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
    RemoveSharedVertices(ValidSpawnLocations, InCurrentExtrema);
    break;
  }
  return ValidSpawnLocations;
}`;

const DevBlog = () => {
  const articlePath = "/devblog/target-spawning-system";

  const ClassesRef = useRef(null);
  const USpawnAreaRef = useRef(null);
  const ATargetManagerRef = useRef(null);
  const USpawnAreaManagerComponentRef = useRef(null);
  const UReinforcementLearningComponentRef = useRef(null);
  const UBoxComponentRef = useRef(null);
  const ABSGameModeRef = useRef(null);
  const ATargetRef = useRef(null);
  const UProjectileMovementComponentRef = useRef(null);
  const UBSAbilitySystemComponentRef = useRef(null);
  const UBSHealthComponentRef = useRef(null);

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
          <div className="sidebar-main fs-150">
            <ul>
              <li>
                <SidebarHashLink
                  path={articlePath}
                  hash={`#classes-header`}
                  id="hl-classes-header"
                  text="Classes"
                  onScreen={{
                    previous: null,
                    current: useOnScreen(ClassesRef),
                  }}
                />
                <ul>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-USpawnArea`}
                      id="hl-classes-USpawnArea"
                      text="Spawn Area"
                      onScreen={{
                        previous: useOnScreen(ClassesRef),
                        current: useOnScreen(USpawnAreaRef),
                      }}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ATargetManager`}
                      id="hl-classes-ATargetManager"
                      text="Target Manager"
                      onScreen={{
                        previous: useOnScreen(USpawnAreaRef),
                        current: useOnScreen(ATargetManagerRef),
                      }}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBoxComponent`}
                          id="hl-classes-UBoxComponent"
                          text="Box Components"
                          onScreen={{
                            previous: useOnScreen(ATargetManagerRef),
                            current: useOnScreen(UBoxComponentRef),
                          }}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UReinforcementLearningComponent`}
                          id="hl-classes-UReinforcementLearningComponent"
                          text="Reinforcement Learning Component"
                          onScreen={{
                            previous: useOnScreen(UBoxComponentRef),
                            current: useOnScreen(UReinforcementLearningComponentRef),
                          }}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-USpawnAreaManagerComponent`}
                          id="hl-classes-USpawnAreaManagerComponent"
                          text="Spawn Area Manager Component"
                          onScreen={{
                            previous: useOnScreen(UReinforcementLearningComponentRef, false),
                            current: useOnScreen(USpawnAreaManagerComponentRef),
                          }}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ATarget`}
                      id="hl-classes-ATarget"
                      text="Target"
                      onScreen={{
                        previous: useOnScreen(USpawnAreaManagerComponentRef),
                        current: useOnScreen(ATargetRef),
                      }}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UProjectileMovementComponent`}
                          id="hl-classes-UProjectileMovementComponent"
                          text="Projectile Movement Component"
                          onScreen={{
                            previous: useOnScreen(ATargetRef),
                            current: useOnScreen(UProjectileMovementComponentRef),
                          }}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBSAbilitySystemComponent`}
                          id="hl-classes-UBSAbilitySystemComponent"
                          text="Ability System Component"
                          onScreen={{
                            previous: useOnScreen(UProjectileMovementComponentRef),
                            current: useOnScreen(UBSAbilitySystemComponentRef),
                          }}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          path={articlePath}
                          hash={`#classes-UBSHealthComponent`}
                          id="hl-classes-UBSHealthComponent"
                          text="Health Component"
                          onScreen={{
                            previous: useOnScreen(UBSAbilitySystemComponentRef),
                            current: useOnScreen(UBSHealthComponentRef),
                          }}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ABSGameMode`}
                      id="hl-classes-ABSGameMode"
                      text="BSGameMode"
                      onScreen={{
                        previous: useOnScreen(UBSHealthComponentRef),
                        current: useOnScreen(ABSGameModeRef),
                      }}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-main">
          <article id="article">
            <div className="article-section">
              <div id="classes-header" className="article-section-header" ref={ClassesRef}>
                <h1>Classes</h1>
              </div>
              <div ref={USpawnAreaRef} id="USpawnAreaRef">
                <div id="classes-USpawnArea" className="inline">
                  <h2 className="inline-flex inline-code">USpawnArea</h2>{" "}
                  <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                  <h4 className="inline-flex inline-code">UObject</h4>
                  <h4 className="inline-flex">&#41;</h4>
                </div>
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
                    its unique global identifier
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    flags that indicate if a target in its area is activated, deactivated, or if its only holding the
                    location (target is no longer visible, but still not allowed to spawn there)
                  </li>
                </ul>
              </div>
              <div className="article-subsection">
                <div ref={ATargetManagerRef} id="ATargetManagerRef">
                  <div className="inline" id="classes-ATargetManager">
                    <h2 className="inline-flex inline-code">ATargetManager</h2>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code"> AActor</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
                  <p>
                    The Target Manager is the actor primarily responsible for spawning, holding references to, and
                    destroying target actors. It calls Activate() and Deactive() on the targets.
                  </p>
                </div>
                <div ref={UBoxComponentRef} id="UBoxComponentRef">
                  <div id="classes-UBoxComponent" className="inline">
                    <h3 className="inline-flex inline-code">UBoxComponent</h3>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UShapeComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
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
                <div ref={UReinforcementLearningComponentRef} id="UReinforcementLearningComponentRef">
                  <div id="classes-UReinforcementLearningComponent" className="inline">
                    <h3 className="inline-flex inline-code">UReinforcementLearningComponent</h3>{" "}
                    <h4 className="inline-flex">&#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UActorComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
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
                <div ref={USpawnAreaManagerComponentRef} id="USpawnAreaManagerComponentRef">
                  <div id="classes-USpawnAreaManagerComponent" className="inline">
                    <h3 className="inline-flex inline-code">USpawnAreaManagerComponent</h3>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UActorComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
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
              <div className="article-subsection">
                <div ref={ATargetRef} id="ATargetRef">
                  <div id="classes-ATarget" className="inline">
                    <h2 className="inline-flex inline-code">ATarget</h2>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">AActor</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
                  <p>
                    While the Target Manager activates the targets, the target itself is responsible for determine when
                    it should deactivate, what it should do when it deactivates, and when (if ever) it should destroy
                    itself. It broadcasts information to the Target Manager when it takes damage from a player or if it
                    damages itself. The class has several important components that help game modes run smoothly.
                  </p>
                </div>
                <div ref={UProjectileMovementComponentRef} id="UProjectileMovementComponentRef">
                  <div id="classes-UProjectileMovementComponent" className="inline">
                    <h3 className="inline-flex inline-code">UProjectileMovementComponent</h3>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UMovementComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
                  <p>
                    The Projectile Movement Component (Movement Comp) is used to automate moving targets. ATargetManager
                    calls <p className="inline-flex vert-align-baseline inline-code">ASphereTarget::SetTargetSpeed</p>{" "}
                    and <p className="inline-flex vert-align-baseline inline-code">ASphereTarget::SetTargetDirection</p>{" "}
                    when it wants to change the velocity or direction.
                    <p className="inline-flex vert-align-baseline inline-code">
                      UProjectileMovementComponent::OnProjectileBounce
                    </p>{" "}
                    is a function that is overriden to retain the same velocity that the target had prior to bouncing
                    into something.
                  </p>
                </div>
                <div ref={UBSAbilitySystemComponentRef} id="UBSAbilitySystemComponentRef">
                  <div id="classes-UBSAbilitySystemComponent" className="inline">
                    <h3 className="inline-flex inline-code">UBSAbilitySystemComponent</h3>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UAbilitySystemComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
                  <p>UBSAbilitySystemComponent stuff</p>
                </div>
                <div ref={UBSHealthComponentRef} id="UBSHealthComponentRef">
                  <div id="classes-UBSHealthComponent" className="inline">
                    <h3 className="inline-flex inline-code">UBSHealthComponent</h3>{" "}
                    <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                    <h4 className="inline-flex inline-code">UActorComponent</h4>
                    <h4 className="inline-flex">&#41;</h4>
                  </div>
                  <p>UBSHealthComponent stuff</p>
                </div>
              </div>
              <div ref={ABSGameModeRef}>
                <div id="classes-ABSGameMode" className="inline">
                  <h2 className="inline-flex inline-code">ABSGameMode</h2>{" "}
                  <h4 className="inline-flex"> &#40;inherits from</h4>{" "}
                  <h4 className="inline-flex inline-code">AGameMode</h4>
                  <h4 className="inline-flex">&#41;</h4>
                </div>
                <p>
                  ABSGameMode spawns and intializes new ATargetManager each time a game mode is started. It also
                  configures the audio analyzer and notifies ATargetManager every time the beat threshold is met.
                </p>
              </div>
            </div>
            <div className="article-section">
              <div className="article-section-header" id="target-lifecycle-header" ref={null}>
                <h1>Target Lifecycle</h1>
              </div>
              <ol>
                <li>
                  ABSGameMode recieves input from the audio analyzer that the beat threshold has been met, and calls
                  ATargetManager::OnAudioAnalyzerBeat(). If using a song from a file, this would occur exactly
                  SpawnBeatDelay seconds before you actually hear the beat.
                </li>
                <li>
                  ATargetManager looks for any existing target(s) that can be activated, and tries to activate them
                  according to the game mode configuration.
                </li>
                <li>
                  if the game mode config allows for targets to be spawned at runtime
                  (ETargetSpawningPolicy::RuntimeOnly), HandleRuntimeSpawnAndActivation() is called
                </li>
              </ol>
              <BSCodeBlock code={GetValidSpawnLocations} language={"c"} showLineNumbers={false} fontSize="0.65rem" />
            </div>
            <div className="article-section">
              <div className="article-section-header" id="target-lifecycle-header" ref={null}>
                <h1>Timeline</h1>
              </div>
              <ol>
                <li>
                  ABSGameMode recieves input from the audio analyzer that the beat threshold has been met, and calls
                  ATargetManager::OnAudioAnalyzerBeat(). If using a song from a file, this would occur exactly
                  SpawnBeatDelay seconds before you actually hear the beat.
                </li>
                <li>
                  ATargetManager looks for any existing target(s) that can be activated, and tries to activate them
                  according to the game mode configuration.
                </li>
                <li>
                  if the game mode config allows for targets to be spawned at runtime
                  (ETargetSpawningPolicy::RuntimeOnly), HandleRuntimeSpawnAndActivation() is called
                </li>
              </ol>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default DevBlog;
