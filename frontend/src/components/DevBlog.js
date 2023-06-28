import { useEffect, useRef, useState, useMemo } from "react";
import useOnScreen from "../hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarHashLink from "./SidebarHashLink";

const DevBlog = () => {
  const articlePath = "/devblog/target-spawning-system";
  const ClassesRef = useRef(null)
  const isOnScreen_Classes = useOnScreen(ClassesRef)
  const USpawnAreaRef = useRef(null)
  const isOnScreen_USpawnArea = useOnScreen(USpawnAreaRef)
  const ATargetManagerRef = useRef(null)
  const isOnScreen_ATargetManager = useOnScreen(ATargetManagerRef)

  const [ios_Classes, setIsOnScreen_Classes]= useState(false);

  useEffect(() => {
    setIsOnScreen_Classes(getTopMostVisible(ClassesRef));
  }, [isOnScreen_Classes, isOnScreen_USpawnArea, isOnScreen_ATargetManager]);

  const getTopMostVisible = (ref) => {
    if (ref === ClassesRef) {
        if (isOnScreen_Classes) {
            console.log("class on scren")
            return true;
        }
        console.log("class not on scren")
        return false;
    }
    if (ref === USpawnAreaRef) {
        if (!isOnScreen_Classes && isOnScreen_USpawnArea) {
            return true;
        }
        return false;
    }
    if (ref === ATargetManagerRef) {
        if (!isOnScreen_Classes && !isOnScreen_USpawnArea && isOnScreen_ATargetManager) {
            return true;
        }
        return false;
    }
    return false;
  }

  return (
    <div className="flex-container-column">
      <div className="hero-container">
        <div className="hero">
          <h1 className="">A look into BeatShot's target spawning system</h1>
          <p className="hero-lead">
            How are spawn locations decided for targets? How are targets
            managed? This post goes into detail about how this is accomplished
            in Unreal.
          </p>
        </div>
      </div>
      <div className="flex-container-row">
        <div className="sidebar-container blog">
          <div className="sidebar-main">
            <ul className="sidebar">
              <li className="sidebar">
                <SidebarHashLink
                  path={articlePath}
                  hash={`#classesHeader`}
                  id="hl-classesHeader"
                  text="Classes"
                  onScreen={ios_Classes}
                />
                <ul className="">
                  <li className="">
                    <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-USpawnArea`}
                      id="hl-classes-USpawnArea"
                      text="Spawn Area"
                      onScreen={getTopMostVisible(USpawnAreaRef)}
                    />
                  </li>
                  <li className="">
                  <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ATargetManager`}
                      id="hl-classes-ATargetManager"
                      text="Target Manager"
                      onScreen={getTopMostVisible(ATargetManagerRef)}
                    />
                    <ul>
                      <li className="">
                      <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-USpawnAreaManagerComponent`}
                      id="hl-classes-USpawnAreaManagerComponent"
                      text="Spawn Area Manager Component"
                    />
                      </li>
                    </ul>
                  </li>
                  <li className="">
                  <SidebarHashLink
                      path={articlePath}
                      hash={`#classes-ABSGameMode`}
                      id="hl-classes-ABSGameMode"
                      text="BSGameMode"
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
              <div id="classesHeader" ref={ClassesRef}>
                <h1>Classes</h1>
              </div>
              <div>
                <div id="classes-USpawnArea" className="inline" ref={USpawnAreaRef}>
                  <h2 className="inline inline-code">USpawnArea</h2>
                  <h2 className="inline"> &#40;inherits from </h2>
                  <h2 className="inline inline-code"> UObject</h2>
                  <h2 className="inline">&#41;</h2>
                </div>
                <p>
                  I had to figure out a way to keep track of where a target has
                  spawned recently along with the total area that it occupied.
                  Target spawn locations are chosen from a two-dimensional
                  rectangle whose dimensions are the Horizontal/Vertical Spread
                  (custom game mode options). These dimensions correspond to the
                  actual size in Unreal units, and when maxed out represent 3.2
                  million individual points. Iterating through that many points
                  isn't even an option, so the total two-dimensional spawn
                  rectangle is broken into the smaller rectangles, where each
                  one is represented by a USpawnArea.
                </p>
                <ul>
                  Each USpawnArea contains:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    info about the area it represents
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    info about the targets that have spawned
                    within it, such as the scale the target spawned with and its
                    unique global identifier
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    flags that indicate if a target in its area is activated,
                    deactivated, or if its only holding the location (target is
                    no longer visible, but still not allowed to spawn there)
                  </li>
                </ul>
              </div>
              <div className="article-subsection">
                <div id="classes-ATargetManager" ref={ATargetManagerRef}>
                  <div className="inline">
                    <h2 className="inline inline-code">ATargetManager</h2>
                    <h2 className="inline"> &#40;inherits from </h2>
                    <h2 className="inline inline-code"> AActor</h2>
                    <h2 className="inline">&#41;</h2>
                  </div>
                  <p>
                    ATargetManager is the actor primarily responsible for
                    spawning, holding references to, and destroying target
                    actors. It calls Activate() and Deactive() on the targets.
                  </p>
                </div>
                <div>
                  <div
                    id="classes-USpawnAreaManagerComponent"
                    className="inline">
                    <h3 className="inline inline-code">
                      USpawnAreaManagerComponent
                    </h3>
                    <h3 className="inline"> &#40;inherits from </h3>
                    <h3 className="inline inline-code"> UActorComponent</h3>
                    <h3 className="inline">&#41;</h3>
                  </div>
                  <p>
                    USpawnAreaManagerComponent (SpawnAreaManager), is a
                    component of ATargetManager, which creates and manages all
                    of the USpawnAreas. Why use a component? A good amount of
                    functions are required to interact with USPawnAreas, so it
                    made sense to encapsulate all the functionality into a
                    component.
                  </p>
                </div>
              </div>
              <div>
                <div id="classes-ABSGameMode" className="inline">
                  <h2 className="inline inline-code">ABSGameMode</h2>
                  <h2 className="inline"> &#40;inherits from </h2>
                  <h2 className="inline inline-code"> AGameMode</h2>
                  <h2 className="inline">&#41;</h2>
                </div>
                <p>
                  ABSGameMode spawns and intializes new ATargetManager each time
                  a game mode is started. It also configures the audio analyzer
                  and notifies ATargetManager every time the beat threshold is
                  met.
                </p>
              </div>
              <div>
                <div id="classes-ASphereTarget" className="inline">
                  <h2 className="inline inline-code">ASphereTarget</h2>
                  <h2 className="inline"> &#40;inherits from </h2>
                  <h2 className="inline inline-code"> AActor</h2>
                  <h2 className="inline">&#41;</h2>
                </div>
                <p>Sphere target stuff</p>
              </div>
            </div>
            <div id="timeline" className="article-section">
                <ol>
                    <li>
                    ABSGameMode recieves input from the audio analyzer that the beat threshold has been met, and calls ATargetManager::OnAudioAnalyzerBeat(). If using a song from a file, this would occur exactly SpawnBeatDelay seconds before you actually hear the beat.
                    </li>
                    <li>
                    ATargetManager looks for any existing target(s) that can be activated, and tries to activate them according to the game mode configuration.
                    </li>
                    <li>
                    if the game mode config allows for targets to be spawned at runtime (ETargetSpawningPolicy::RuntimeOnly), HandleRuntimeSpawnAndActivation() is called
                    </li>

                </ol>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                nostrum doloribus esse nam laudantium maiores molestiae,
                accusantium veniam officia nulla debitis, dolorum laboriosam
                adipisci consequuntur ex quasi? Eligendi corporis nulla ipsum in
                ad veniam libero quis cumque, quod nesciunt doloremque officia
                illo molestiae iste id illum. Officia tempore in deleniti
                exercitationem, quidem ducimus non molestiae veritatis
                doloremque nihil recusandae natus vitae, quasi ex itaque
                voluptate. Doloribus, deleniti vero. Consequuntur voluptates
                obcaecati aperiam nemo minima. Tempora, incidunt amet. Totam
                tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
                quo explicabo, libero autem deserunt iste, consequuntur dolore
                asperiores quos inventore voluptas eius?
              </p>
            </div>
            <div id="nextsection" className="article-section">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                nostrum doloribus esse nam laudantium maiores molestiae,
                accusantium veniam officia nulla debitis, dolorum laboriosam
                adipisci consequuntur ex quasi? Eligendi corporis nulla ipsum in
                ad veniam libero quis cumque, quod nesciunt doloremque officia
                illo molestiae iste id illum. Officia tempore in deleniti
                exercitationem, quidem ducimus non molestiae veritatis
                doloremque nihil recusandae natus vitae, quasi ex itaque
                voluptate. Doloribus, deleniti vero. Consequuntur voluptates
                obcaecati aperiam nemo minima. Tempora, incidunt amet. Totam
                tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
                quo explicabo, libero autem deserunt iste, consequuntur dolore
                asperiores quos inventore voluptas eius?
              </p>
            </div>
            <div id="nextsection" className="article-section">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                nostrum doloribus esse nam laudantium maiores molestiae,
                accusantium veniam officia nulla debitis, dolorum laboriosam
                adipisci consequuntur ex quasi? Eligendi corporis nulla ipsum in
                ad veniam libero quis cumque, quod nesciunt doloremque officia
                illo molestiae iste id illum. Officia tempore in deleniti
                exercitationem, quidem ducimus non molestiae veritatis
                doloremque nihil recusandae natus vitae, quasi ex itaque
                voluptate. Doloribus, deleniti vero. Consequuntur voluptates
                obcaecati aperiam nemo minima. Tempora, incidunt amet. Totam
                tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
                quo explicabo, libero autem deserunt iste, consequuntur dolore
                asperiores quos inventore voluptas eius?
              </p>
            </div>
            <div id="nextsection" className="article-section">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                nostrum doloribus esse nam laudantium maiores molestiae,
                accusantium veniam officia nulla debitis, dolorum laboriosam
                adipisci consequuntur ex quasi? Eligendi corporis nulla ipsum in
                ad veniam libero quis cumque, quod nesciunt doloremque officia
                illo molestiae iste id illum. Officia tempore in deleniti
                exercitationem, quidem ducimus non molestiae veritatis
                doloremque nihil recusandae natus vitae, quasi ex itaque
                voluptate. Doloribus, deleniti vero. Consequuntur voluptates
                obcaecati aperiam nemo minima. Tempora, incidunt amet. Totam
                tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
                quo explicabo, libero autem deserunt iste, consequuntur dolore
                asperiores quos inventore voluptas eius?
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default DevBlog;
