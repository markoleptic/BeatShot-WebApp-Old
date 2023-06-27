import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import useOnScreen from "../hooks/useScreenObserver";

const options = {
  root: document.getElementById("div.content"),
  rootMargin: "0px 10px 0px 10px",
  threshold: 0.5,
  trackVisibility: true,
  delay: 100,
};

function callback(entries, observer) {
  if (entries[0].isIntersecting)
    console.log(entries[0].target.getAttribute("id"));
  //const [entry] = entries;
  // if (!entry.isIntersecting) return;
  //console.log(entry.target.getAttribute("id"))
  //   get the class name of current section that is in view
  //const curSectionsName = entry.target.getAttribute("class");
  //   Now select that specific target section
  // const curSection = document.querySelector(`.${curSectionsName}`);
  //curSection.lastElementChild.firstElementChild.classList.remove("hidden-left");
  //curSection.lastElementChild.lastElementChild.classList.remove("hidden-right");
  // observer.unobserve(entry.target);
}

const DevBlog = () => {
  const allSections = document.querySelectorAll("div.content p");
  useEffect(() => {
    console.log(allSections);
    /*     const sectionObserver = new IntersectionObserver(callback, options);
        allSections.forEach((section) => {
            sectionObserver.observe(section);
         }); */

    const observer = new IntersectionObserver(callback, options);
    allSections.forEach((section) => {
      observer.observe(section);
    });
  }, [allSections]);

  /*       document.querySelectorAll(".left-column").forEach((column) => {
        column.classList.add("hidden-left");
      });
      document.querySelectorAll(".right-column").forEach((column) => {
        column.classList.add("hidden-right");
      }); */

  /*     const ref = useRef(null)
    const visible = useOnScreen(ref)
    useEffect(() => {
        
        for (let h in allSections) {
            console.log(h.id)
        }
       console.log("vchange")
    }, [visible]); */

  return (
    <div className="flex-container-column">
      <div className="page-hero">
        <h1 className="page-title">
          A look into BeatShot's target spawning system
        </h1>
        <p className="page-lead">
          How are spawn locations decided for targets? How are targets managed?
          This post goes into detail about how this is accomplished in Unreal.
        </p>
      </div>
      <div className="flex-container-row">
        <div className="sidebar-container blog">
          <div className="sidebar-main">
            <ul className="sidebar">
              <li className="sidebar">
                <NavLink
                  to={`#classes`}
                  id="#classes"
                  className={({ isActive, isPending }) =>
                    "hover-blue link" + (isActive ? " active" : "")
                  }>
                  Classes
                </NavLink>
                <ul className="">
                  <li className="">
                    <NavLink
                      to={`#classes-uspawnarea`}
                      id="#classes-uspawnarea"
                      className={({ isActive, isPending }) =>
                        "hover-blue link" + (isActive ? " active" : "")
                      }>
                      Spawn Area
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to={`#classes-atargetmanager`}
                      id="#classes-atargetmanager"
                      className={({ isActive, isPending }) =>
                        "sidebar-item hover-blue link" +
                        (isActive ? " active" : "")
                      }>
                      Target Manager
                    </NavLink>
                    <ul>
                      <li className="">
                        <NavLink
                          to={`#classes-USpawnAreaManagerComponent`}
                          id="#classes-USpawnAreaManagerComponent"
                          className={({ isActive, isPending }) =>
                            "hover-blue link" + (isActive ? " active" : "")
                          }>
                          Spawn Area Manager Component
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="">
                    <NavLink
                      to={`#classes-absgamemode`}
                      id="#classes-absgamemode"
                      className={({ isActive, isPending }) =>
                        "hover-blue link" + (isActive ? " active" : "")
                      }>
                      BSGameMode
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-main">
          <article>
            <div id="classes">
              <h1>Classes</h1>
              <div id="classes-uspawnarea">
                <div className="inline">
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
              </div>
              <div id="classes-ATargetManager">
                <h2>ATargetManager (inherits from AActor)</h2>
                <p>
                  ATargetManager is the actor primarily responsible for
                  spawning, holding references to, and destroying target actors.
                  It calls Activate() and Deactive() on the targets.
                </p>
                <div id="classes-USpawnAreaManagerComponent">
                  <h3>
                    USpawnAreaManagerComponent (inherits from UActorComponent)
                  </h3>
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
              <div id="classes-ABSGameMode">
                <h2>ABSGameMode (inherits from AGameMode)</h2>
                <p>
                  ABSGameMode spawns and intializes new ATargetManager each time
                  a game mode is started. It also configures the audio analyzer
                  and notifies ATargetManager every time the beat threshold is
                  met.
                </p>
              </div>
              <div id="classes-ASphereTarget">
                <h2>ASphereTarget (inherits from AActor)</h2>
                <p>Sphere target stuff</p>
              </div>
            </div>
            <div id="nextsection">
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
