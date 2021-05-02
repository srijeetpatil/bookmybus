import styles from "../../styles/Localtravel.module.css";

function MarkerPopup(props) {
  let routes = props.routes.map((r) => {
    return <div>{r}</div>;
  });
  return (
    <div className={styles.marker_popup}>
      {props.name}
      {routes}
    </div>
  );
}

export default MarkerPopup;
