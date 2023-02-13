import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = (props) => {
  const { faqs } = props
  const [clicked, setClicked] = useState("0");

  useEffect(() => {
		setClicked(0)
	}, []);

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <ul className="accordion">
      {faqs.map((faq, index) => (
        <AccordionItem
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          key={index}
          faq={faq}
        />
      ))}
    </ul>
  );
};

export default Accordion;