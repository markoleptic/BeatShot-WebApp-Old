import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";

const PatchNotes = () => {
  return (
    <>
      <div className="flex-container pn-container">
        <div className="content">
          <div className="content-header">
            <h2 className="pn-title">Patch Notes</h2>
          </div>
          <div className="content-main">
            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.3.0</h3>
                <p className="pn-date">November 23, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New: Custom Crosshair
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added crosshair customization in the settings menu
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Inner gap, line width/height, outline width and opacity,
                      and color
                    </li>
                  </ul>
                </li>

                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New: Floating Combat Text
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added floating text that appears on top of a recently
                      destroyed target, showing the player's current consecutive
                      targets destroyed (intervals of 5)
                    </li>
                  </ul>
                </li>

                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New: Recoil, Firerate, Bullet Decals
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Csgo-style recoil added, meaning that the spray pattern is
                      the same every time
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Automatic fire rate added
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Settings to control both are shootable settings on the
                      wall to the left, along with show/hide bullet decals
                    </li>
                  </ul>
                </li>

                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  More Settings
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Global Illumination, Reflection Quality, Shading Quality,
                      Visual Effect Quality, FPS counter
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added CSGO sensitivity option
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Player Movement Updates
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added ability to walk, jump, and crouch.
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  User Interface
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Changed font for current song length to be monospaced
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Made the player hud box static sized so it doesn't
                      constantly change size based on different values
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added a streak tracker to the player hud which shows the
                      max number of targets destroyed in a row for the current
                      session
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Miscellaneous
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Removed unused assets from project
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where restarting from the post game menu
                      wouldn't unpause the game
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where the website wasn't correctly querying
                      the specific user's scores
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Remove unused fonts
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where scores weren't being saved to database
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.2.1</h3>
                <p className="pn-date">November 4, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New Feature: Spread Type
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Dynamic Spread
                      <ul>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl2"
                          />
                          Dynamic Spread changes the horizontal/vertical spread
                          based on performance, where better performances lowers
                          the spread.
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl2"
                          />
                          Random: chooses random point in dynamically sized
                          spawn area
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl2"
                          />
                          EdgeOnly: chooses random point on edge of dynamically
                          sized spread
                        </li>
                      </ul>
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Static Spread
                      <ul>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl2"
                          />
                          Removed Narrow/Wide Spread as Variant Game Modes
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl2"
                          />
                          now implemented using StaticWide and StaticNarrow
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New Feature: Dynamic Spread sizing
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      interpolates between min target size and max target size
                      based on performance, where better performance shrinks the
                      target.
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New Feature: Game Mode Difficulties
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      added 3 difficulties for the core game modes
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Miscellaneous
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed Best Reaction time (was showing max instead of min)
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed BeatGrid targets destroying ~3 seconds early
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed issue where inactive BeatGrid targets were
                      damageable
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.2.0</h3>
                <p className="pn-date">October 28, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New Feature: Beatshot website integration
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      login to the game with your Beatshot account info (it
                      remembers so you only have to do it once)
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      score analysis tab replaced with in-game web browser
                      showing your profile statistics page (requires being
                      logged in)
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      if you don't make an account, your scores will still be
                      saved locally and will be uploaded if you ever do decide
                      to make one
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      scores are automatically uploaded to database every time
                      you complete a game mode
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  BeatTrack improvements
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      targets now start reverse direction if they hit the edge
                      of the spawn area
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      direction of BeatTrack targets now take into account the
                      speed and cooldown of the game mode. This means it is much
                      less likely to choose a path that would cause it to
                      reverse directions (ie travel a short distance to edge of
                      spawn area and forcibly reverse)
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  UI Updates
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      fixed the linking of min/max target scale and min/max
                      target speed so that entering a value in the text box
                      while linked changes both the min and max values
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      login and register screens added
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      game now asks user if they want to save their scores
                      before quitting from pause menu
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      patch notes now are now shown using in-game browser
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Other
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      disabled Lumen Global Illumination and Lumen reflections
                      because it was using too many resources. Now use screen
                      space global illumination and reflections. Performance
                      should be much better than previous version
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      fixed a bug where the open file dialog wouldn't be
                      interactable if in fullscreen mode (actually just switches
                      to fullscreen windowed while selecting a song, and then
                      switches back to fullscreen)
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      fixed a game crash bug where Beat Grid would reference a
                      deleted target (x2)
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      minor improvements to muzzle flash
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.5</h3>
                <p className="pn-date">September 25, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New game mode: BeatGrid
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Spawns 4, 9, 16, 25, or 36 targets that persist for the
                      whole song
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Music beats cause targets to "activate", which causes them
                      to become damagable and plays the usual color change,
                      before returning to white if not destroyed.{" "}
                    </li>
                    <ul>
                      <li className="pn-li-lvl2">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="pn-icon-lvl2"
                        />
                        Destroying a target plays the destroy animation and
                        briefly causes the target to disappear and reappear.
                      </li>
                    </ul>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Misc:
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Targets are less blindingly bright now
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Replaced some true/false comboboxes with checkboxes
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added options to "lock" values such as min/max target size
                      using checkboxes
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added some mutually exclusive settings into a combobox
                      near the top of game modes
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Updated destroy animation so it now properly scales with
                      target size.
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed bullet projectile scaling (previously soccer ball
                      size lmao)
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.4</h3>
                <p className="pn-date">September 21, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Added a scoring menu which is accessible on main menu and also
                  appears when song is finished.
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      shows most recently played game mode & song stats by
                      default when opening.
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      when you select a different game mode, you can select
                      different songs and it will show your most recent score
                      stats, and the average for all of that song. It also
                      displays your scores over time to a line chart.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.3</h3>
                <p className="pn-date">September 15, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Bug Fixes
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where target spawn delay wasn't correctly
                      updating in GameModeSettings
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where AASettings weren't being updated
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where accuracy wasn't updating correctly in
                      Beat Track game mode
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a bug where accuracy was showing much lower than
                      intended after restarting a Beat Track game mode
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Fixed a lot of bugs that wouldn't save custom game modes
                      correctly or wouldn't save player scores for specific game
                      modes correctly
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      So yeah basically everything was broken
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Added a scuffed visualizer at the top of the spawn wall
                      that shows the frequency spectrum of each currently active
                      band channel
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.2</h3>
                <p className="pn-date">September 13, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Custom Game Mode Saving
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Players can now save and load custom game modes using the
                      GameModes menu (inside main menu). Doesn't allow user to
                      override a base game mode, but will override a custom game
                      mode if selected in the "GameMode template" box. Scores
                      are also now saved specific to custom games modes as well
                      as the base game modes.
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Scoring Update
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Unique high scores are now saved based on the following
                      parameters:
                      <ul>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl3"
                          />
                          GameMode name (including custom game modes)
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl3"
                          />
                          Song Title from metadata if possible, otherwise uses
                          filename.
                        </li>
                      </ul>
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Scoring is now (roughly) normalized by setting a maximum
                      possible score of 100,000 and dividing by the max possible
                      targets that could spawn (Song length divided by target
                      spawn cooldown), based on the game mode loaded. This sets
                      the max score for a single target.{" "}
                      <ul>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl3"
                          />
                          Players receive the max score by destroying a target
                          within +-0.05s of the peak green color. The score then
                          drops off linearly from the peak based on the time
                          away from the peak color, down to half of the max
                          score.
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl3"
                          />
                          This isn't perfect because a target won't always spawn
                          exactly on the target spawn cooldown due to the
                          spawning being tied to beats.
                        </li>
                        <li className="pn-li-lvl3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="pn-icon-lvl3"
                          />
                          Fixed an issue where scoring wasn't taking the Spawn
                          Beat Delay into account.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.1</h3>
                <p className="pn-date">September 10, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  New GameMode: BeatTrack
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      One target, crosshair on target grants score + changes
                      color to green, shooting does nothing
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Accuracy and score is implemented, but scoring is very
                      simple and numbers aren't tuned. Other gamemodes share the
                      same "high score" at this point in time.
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      Sometimes the target will start to clip through
                      walls/floor lol
                    </li>
                  </ul>
                </li>
                <li></li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  More Options for Spawn Beat Delay (previously named something
                  longer)
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      added description to this and Target Spawn cooldown, as
                      these are probably unclear to a new player
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      if no spawn delay is selected, only one AudioAnalyzer is
                      used (compared to two, in order to accomplish a delay)
                    </li>
                  </ul>
                </li>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Miscellaneous
                  <ul>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      UI text overlapping improvements
                    </li>
                    <li className="pn-li-lvl2">
                      <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                      smaller file size since I'm now using "Shipping" build
                      instead of "Development"
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pn-wrapper">
              <div className="pn-version-date">
                <h3 className="pn-version-number">Patch Notes 0.1.0</h3>
                <p className="pn-date">September 8, 2022</p>
              </div>
              <ul>
                <li className="pn-li-lvl1">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="pn-icon-lvl1"
                  />
                  Initial public "early alpha" build, mainly to collect feedback
                  and response.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatchNotes;
