import Image from "next/image";
import ProjectScreen from "../../public/screenshots.png";
import Timers from "../../public/timers.svg";
import WorkingSession from "../../public/working-session.svg";

export default function About() {
  return (
    <div className="w-full flex items-center p-16 gap-24 flex-col">
      <div className="min-h-96 flex flex-wrap items-center justify-center w-full gap-12 max-w-6xl text-4xl text-wot-rose">
        <div className="w-[30rem]">
          <h1 className="text-3xl sm:text-4xl text-wot-rose">
            Your personal project management solution
          </h1>
          <p className="text-base sm:text-lg mt-8 text-wot-black">
            <i>Working on Time</i> is designed to be a simple application based
            on the principles of the Pomodoro Technique, with a project
            configuration that has everything a user needs without the
            superfluous bells and whistles that come with those expensive
            services.
          </p>
          <p className="text-base sm:text-lg mt-6 text-wot-black">
            Each project has a description, due date, priority, and a list of
            tasks which can be rearranged using a simple, intuitive
            drag-and-drop.
          </p>
        </div>
        <div className="flex-1 min-w-80 max-w-[35rem]">
          <Image
            height={420}
            alt="Project screenshot"
            src={ProjectScreen}
            loading="eager"
          />
        </div>
      </div>

      <div className="min-h-96 flex flex-wrap-reverse w-full items-center justify-center max-w-6xl gap-12 text-4xl text-wot-rose">
        <div className="flex-1 min-w-80 max-w-[35rem]">
          <Image height={420} alt="Project screenshot" src={Timers} />
        </div>
        <div className="w-[30rem]">
          <h1 className="text-3xl sm:text-4xl text-wot-rose">
            Radial timers and sound cues keep you on track
          </h1>
          <p className="text-base sm:text-lg mt-8 text-wot-black">
            With simple, color-coded radial timers indicating whether you're
            working or resting, along with a clear sound cue to mark each
            transtion between the two, it's easy to focus on your task and rest
            assured you'll know when it's time for a well-earned break.
          </p>
          <p className="text-base sm:text-lg mt-6 text-wot-black">
            The timers can be set up to an hour; while a standard 25 on 5 off
            split may not be for everyone, we believe that a working session any
            longer than 60 minutes defeats the purpose of the Pomodoro
            Technique.
          </p>
        </div>
      </div>

      <div className="min-h-96 flex flex-wrap items-center justify-center w-full gap-12 max-w-6xl text-4xl text-wot-rose">
        <div className="w-[30rem]">
          <h1 className="text-3xl sm:text-4xl text-wot-rose">
            Color-coded project priority adds visual clarity
          </h1>
          <p className="text-base sm:text-lg mt-8 text-wot-black">
            Looking at your project list, it's easy to tell at a glance which
            projects are most important and need to be addressed when you're
            choosing a project for which to initiate a working session.
          </p>
          <p className="text-base sm:text-lg mt-6 text-wot-black">
            You can even change projects on the fly during a working session,
            without losing your timer's settings.
          </p>
        </div>
        <div className="flex-1 min-w-80 max-w-[35rem]">
          <Image height={420} alt="Project screenshot" src={WorkingSession} />
        </div>
      </div>
    </div>
  );
}
