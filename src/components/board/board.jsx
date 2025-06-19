import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import AddSection from "../addSection/addSection";
import Section from "../section/section";

export default function Board() {
  //STATE
  const scrollRef = useRef(null);
  const sections = useAppStore((state) => state.sections);

  //ACTION
  useEffect(() => {
    if (scrollRef.current) {
      const sectionElements = scrollRef.current.querySelectorAll(".section");

      const length = sectionElements.length;
      const secondLastSection = sectionElements[length - 2];

      //scroll to the second last section
      scrollRef.current.scrollTo({
        left: secondLastSection.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [Object.keys(sections).length]);

  return (
    <main className="container">
      <div className="kanban-board" ref={scrollRef}>
        <div className="kanban-board__sections">
          {Object.entries(sections).map(([section, taskList], index) => (
            <Section key={section} taskList={taskList} section={section} />
          ))}
        </div>
      </div>

      <AddSection />
    </main>
  );
}
