import {addReview, AuthMeThunk, isLogin, like, newTextReview} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import React from "react";
import Profile from "./Profile";
import {Navigate, useParams} from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}

        />
    );
}

class ProfileAPIContainer extends React.Component {
    debugger
    componentDidMount() {

        let userId = this.props.params.userId;
        this.props.AuthMeThunk(userId)
    }

    componentWillUnmount() {

    }

    render() {
debugger
        if (this.props.isLogin === false) {
            alert("unlogin")
        }
        return <Profile {...this.props} IDD={this.props.id}/>
    }
}
let UrlDataContainerComponent = withRouter(ProfileAPIContainer);

let mapStateToProps = (state) => {


    return {
        UserId: state.auth.id,
        id: state.profilePage.id,
        ReviewData: state.profilePage.ReviewData,
        name: state.profilePage.PersonalData.name,
        avatar: state.profilePage.PersonalData.avatar,
        born: state.profilePage.PersonalData.born,
        education: state.profilePage.PersonalData.education,
        city: state.profilePage.PersonalData.city,
        site: state.profilePage.PersonalData.site,
        NewReviewText: state.profilePage.NewReviewText,
        Profile: state.profilePage.Profile,
isLogin: state.auth.isLogin
    }

}

let ProfileContainer = connect(mapStateToProps, {

    addReview,
    newTextReview,
    like,
    AuthMeThunk,
    isLogin
})(UrlDataContainerComponent);

export default ProfileContainer;
