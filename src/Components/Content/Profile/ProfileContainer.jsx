import {
    addReview,
    AuthMeThunk,
    GetNewProfile,
    GetStatusThunk,
    isLogin,
    like,
    UpdateStatusThunk
} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import Profile from "./Profile";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import Loading from "../../../common/Loading/loading";
import {GetAuthMeId, GetProfile, GetReviewData, GetStatus} from "../../Redux/users-selector";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import MyLoader from "../../../common/Loading/skele";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}

        />
    );
}

let ProfileAPIContainer = (props) => {


    let [state, SetState] = useState(props)

    useEffect(() => {

        let userId = props.params.userId;
        if (!userId) {
            userId = props.UserId
        }
        props.GetNewProfile(userId)
        props.GetStatusThunk(userId)


    }, [props.UserId])


    if (!props.Profile || props.Status === null) {
        return <MyLoader/>
    }

    if (props === state) {
        return <MyLoader/>
    }

    return <Profile {...props} Status={props.Status} updateStatus={props.UpdateStatusThunk}/>

}


let mapStateToProps = (state) => {

    return {
        UserId: GetAuthMeId(state),
        ReviewData: GetReviewData(state),
        Profile: GetProfile(state),
        Status: GetStatus(state)
    }

}
export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {
        addReview,
        like,
        AuthMeThunk,
        isLogin,
        UpdateStatusThunk,
        GetStatusThunk,
        GetNewProfile
    }),
)
(ProfileAPIContainer);
