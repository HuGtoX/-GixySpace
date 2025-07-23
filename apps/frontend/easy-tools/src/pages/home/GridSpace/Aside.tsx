import Weather from "../components/Weather";
import QickLink from "../components/QickLink";
import DailySentence from "../components/DailySentence";
import MoreTools from "../components/MoreTools";

function Aside() {
  return (
    <>
      <Weather />
      <DailySentence />
      <QickLink />
      <MoreTools />
    </>
  );
}

export default Aside;
