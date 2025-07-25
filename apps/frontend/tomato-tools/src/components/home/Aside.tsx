import Weather from "./Weather";
import QuickLink from "./QuickLink";
import DailySentence from "./DailySentence";
import MoreTools from "./MoreTools";

function Aside() {
  return (
    <>
      <Weather />
      <DailySentence />
      <QuickLink />
      <MoreTools />
    </>
  );
}

export default Aside;