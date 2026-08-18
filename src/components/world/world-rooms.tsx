"use client";

import { McButton } from "@/components/mc-button";
import { playClick } from "@/lib/sound";
import { PROFILE } from "@/lib/content/profile";
import type { WorldApi } from "@/lib/world/types";

type Props = {
  api: WorldApi;
  onBack: () => void;
  onEnd: () => void;
};

export function WorldRooms({ api, onBack, onEnd }: Props) {
  const { room, flags, has, grant, achieve, say, setFlag } = api;

  if (room === "academy") {
    return (
      <section className="chamber chamber--academy">
        <p className="chamber__coord">stone hall · unnamed</p>
        <div className="chamber__set">
          <button
            type="button"
            className="hotspot hotspot--lectern"
            onClick={() => {
              grant("chronicle");
              achieve("bookworm");
              say(
                "lectern",
                `The chronicle is not a résumé. It is attendance. ${PROFILE.education.school}. ${PROFILE.education.degree}. ${PROFILE.education.dates}. In the margin, in smaller graphite: ${PROFILE.education.detail}.`,
              );
            }}
          >
            lectern
          </button>
          <button
            type="button"
            className="hotspot hotspot--shelf"
            onClick={() =>
              say(
                "shelf",
                "DSA. Networks. OOP. The spines are worn at the chapters about graphs. Someone has been circling 'agent' in every textbook, which is not a word that belongs there yet.",
              )
            }
          >
            shelf
          </button>
          <button
            type="button"
            className="hotspot hotspot--window"
            onClick={() => say("window", `${PROFILE.location}. The hill does not care about internships.`)}
          >
            window
          </button>
        </div>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "foundry") {
    return (
      <section className="chamber chamber--foundry">
        <p className="chamber__coord">heat · unnamed factory</p>
        <div className="chamber__set">
          <button
            type="button"
            className="hotspot hotspot--furnace"
            onClick={() =>
              say(
                "reranker",
                "Query in. Rewrite. HyDE. Rerank. The needle on the furnace sits at 78% and refuses to be a statistic on a website. It is a temperature.",
              )
            }
          >
            furnace
          </button>
          <button
            type="button"
            className="hotspot hotspot--crate"
            onClick={() =>
              say(
                "crate",
                "Stamped: Persistent Systems. Aug 2025 – Nov 2025. Inside: a conversational retrieval loop that still smells like documents.",
              )
            }
          >
            crate
          </button>
          <button
            type="button"
            className="hotspot hotspot--pipe"
            onClick={() => say("pipe", "LangChain, running like plumbing. Do not unscrew it. The knowledge will flood the floor.")}
          >
            pipe
          </button>
        </div>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "lab") {
    return (
      <section className="chamber chamber--lab">
        <p className="chamber__coord">y = -12 · unauthorized</p>
        <pre className="chamber__term">
{`froncort@vertex:~$ tail -f /var/log/graph
[guardrail] ok
[file_select] workbook_03.xlsx  (hostile headers)
[retrieve] chroma://local  pinecone://maybe
[sandbox] docker run --network=none python:clean
[format] SSE still open
[memory] postgres sliding window
[reviewer] MISSING
[operator] intern  Apr 2026—present
[status] half of the agents are asleep on purpose`}
        </pre>
        <div className="chamber__set">
          <button
            type="button"
            className="hotspot hotspot--tank"
            onClick={() => {
              grant("agent_core");
              say(
                "tank",
                "A Planner with no Reviewer. It wants to clean every spreadsheet in Pune. You take the core before it notices.",
              );
            }}
          >
            glass tank
          </button>
          <button
            type="button"
            className="hotspot hotspot--board"
            onClick={() =>
              say(
                "whiteboard",
                "LangGraph nodes, drawn and redrawn. Guardrail → select → retrieve → sandbox → format. Someone wrote 'Gemini Pro/Flash' and then underlined Flash twice.",
              )
            }
          >
            whiteboard
          </button>
          {has("half_agent") ? (
            <button
              type="button"
              className="hotspot hotspot--glitch"
              onClick={() => say("half-agent", "I have a plan. I do not have a judge. This is how production incidents are born.")}
            >
              the half-agent
            </button>
          ) : null}
        </div>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "bunker") {
    return (
      <section className="chamber chamber--bunker">
        <p className="chamber__coord">faraday cage · do not tweet this</p>
        <div className="chamber__set">
          <button
            type="button"
            className="hotspot hotspot--terminal"
            onClick={() =>
              say(
                "tty",
                "nmap -sV 10.0.0.0/24  # it is a memory, not a crime. PICT Cybercell left the kettle on. Technical Head is a title that fits on a sticky note.",
              )
            }
          >
            tty0
          </button>
          <button
            type="button"
            className="hotspot hotspot--note"
            onClick={() => {
              grant("encrypted_note");
              say(
                "note",
                "An autonomous pentester, boxed. FastAPI. LangGraph. It writes reports instead of bragging. The repo is not on the wall. Some doors stay closed.",
              );
            }}
          >
            sticky note
          </button>
          <button
            type="button"
            className="hotspot hotspot--rack"
            onClick={() =>
              say("rack", "SQLi prevention pipeline, still dripping. Python, coiled. A bot that reads GitHub so humans don't have to.")
            }
          >
            rack
          </button>
          {has("bunker_key") ? (
            <button
              type="button"
              className="hotspot hotspot--locker"
              onClick={() =>
                say(
                  "locker",
                  "Inner locker. Tools without a trophy case. If you came here looking for a skill bar, you are in the wrong biome.",
                )
              }
            >
              inner locker
            </button>
          ) : null}
        </div>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "workshop") {
    return (
      <section className="chamber chamber--workshop">
        <p className="chamber__coord">under construction · always</p>
        <div className="chamber__set">
          <button
            type="button"
            className="hotspot hotspot--bench"
            onClick={() => {
              if (!flags.lever) say("bench", "The machines are dark. A lever on the grass would help. You felt it. You walked past it.");
              else
                say(
                  "bench",
                  "DeploX twitching. DevSync half-wired. TypeScript shavings on the floor. Nothing here is finished. That is the point.",
                );
            }}
          >
            workbench
          </button>
          <button
            type="button"
            className="hotspot hotspot--bot"
            onClick={() =>
              say("bot", "GitHub Repo Intelligence Bot. It summarises commits so you don't have to pretend you read them.")
            }
          >
            bot chassis
          </button>
          <button
            type="button"
            className="hotspot hotspot--search"
            onClick={() =>
              say("search", "Planner. Selector. Reporter. Reviewer. Four agents in a trench coat, arguing about Serper.")
            }
          >
            search rig
          </button>
          <button
            type="button"
            className="hotspot"
            onClick={() => {
              setFlag("craft", true);
              playClick();
            }}
          >
            crafting table
          </button>
        </div>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "arena") {
    return (
      <section className="chamber chamber--arena">
        <p className="chamber__coord">InC · 2024 · too many footsteps</p>
        <div className="chamber__crowd" aria-hidden="true">
          {Array.from({ length: 80 }, (_, i) => (
            <span key={i} className="chamber__dot" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <button
          type="button"
          className="hotspot hotspot--mic"
          onClick={() =>
            say(
              "schedule",
              "Fifty students. Thirty judges. You were the escort lead, which means you were the person who knew where everyone was supposed to be, including the people who did not want to be found.",
            )
          }
        >
          abandoned clipboard
        </button>
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "temple") {
    return (
      <section className="chamber chamber--temple">
        <p className="chamber__coord">altitude · not Mojang</p>
        <button
          type="button"
          className="hotspot hotspot--shard"
          onClick={() => {
            grant("azure_shard");
            say("shard", "AZ-900. The sky issued a certificate. It does not glow. It just sits there, being true.");
          }}
        >
          floating shard
        </button>
        <p className="chamber__whisper">Clouds are just Azure with worse branding.</p>
        {has("omkar_key") ? (
          <button type="button" className="hotspot hotspot--void" onClick={onEnd}>
            a hole in the sky
          </button>
        ) : null}
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "end") {
    return (
      <section className="chamber chamber--end">
        <p className="chamber__coord">the last door</p>
        <article className="chamber__poem">
          <p>You wanted a paragraph that started with his name.</p>
          <p>The world refused.</p>
          <p>He builds agents that babysit other agents.</p>
          <p>He keeps a bunker because curiosity looks like an exploit if you squint.</p>
          <p>He is still in school and already in production.</p>
          <p>Pune. 2023–2027. The rest is in the walls.</p>
        </article>
        {has("omkar_key") ? <p className="chamber__whisper">The key fits. Of course it does. He made it.</p> : null}
        <Back onBack={onBack} />
      </section>
    );
  }

  if (room === "crash") {
    return (
      <section className="chamber chamber--crash">
        <h2>Connection Lost</h2>
        <p>java.lang.SudoException: this is not /</p>
        <p className="chamber__whisper">The obvious button is a liar.</p>
        <button
          type="button"
          className="mc-widget"
          onClick={() => {
            playClick();
            say("title screen", "No. That would be too easy. Try the dirt.");
          }}
        >
          <span className="mc-widget__label">Back to Title Screen</span>
        </button>
        <button type="button" className="world__dirt" aria-label="Keep playing" onClick={onBack} />
        <McButton href="/">actually leave</McButton>
      </section>
    );
  }

  return null;
}

function Back({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" className="mc-widget chamber__back" onClick={onBack}>
      <span className="mc-widget__label">Leave</span>
    </button>
  );
}
