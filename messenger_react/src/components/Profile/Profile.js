import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../store/profile/actions";

export const Profile = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state);
    const handleClick = () => {
        dispatch(toggleCheckbox);
    };
    return (
        <>
            <h3>Profile</h3>
            {state.showName && < span > {state.name}</span>}
            <button onClick={handleClick}>change show Name</button>
        </>
    );
};