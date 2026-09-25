import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import markup from "../bree/markup.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bree Mokoena — Notes from Behind the Counter" },
      { name: "description", content: "Pharmacist by day, creator by night. Honest health notes, quizzes and quiet moments from Bree Mokoena." },
      { property: "og:title", content: "Bree Mokoena — Notes from Behind the Counter" },
      { property: "og:description", content: "Pharmacist by day, creator by night. Honest health notes, quizzes and quiet moments from Bree Mokoena." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (document.documentElement.dataset["breeMotion"] === "ready") return;
    document.documentElement.dataset["breeMotion"] = "ready";

    const sources = [
      "/bree/vendor/gsap.min.js",
      "/bree/vendor/ScrollTrigger.min.js",
      "/bree/vendor/lenis.min.js",
      "/bree/main.js",
    ];

    const load = async () => {
      for (const src of sources) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Could not load ${src}`));
          document.body.appendChild(script);
        });
      }
    };

    void load().catch(() => document.documentElement.classList.add("static"));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
