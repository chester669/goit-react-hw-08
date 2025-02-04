import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  return (
    <input
      className={styles["search-box"]}
      type="text"
      placeholder="Find contacts by name"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};

export default SearchBox;
