import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { StudentDashboard } from "../StudentDashboard/StudentDashboard";

const PrintToPDF = (props) => {
  console.log("I'm here");
  const componentRef = useRef(null);
  const [loading, setLoading] = React.useState(false);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    return <button>Print using a Functional Component</button>;
  }, []);

  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="'s Knowledge Checklist"
        onBeforePrint={handleBeforePrint}
        trigger={reactToPrintTrigger}
        onAfterPrint={handleAfterPrint}
        removeAfterPrint
      />
      <StudentDashboard cookies={props.cookies} ref={componentRef} />
    </div>
  );
};

export default PrintToPDF;
