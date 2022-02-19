import {HeaderAPI, UsersAPI} from "../../API/API";

const addnewreview = "ADD-NEW-REVIEW";
const updatereviewtext = "UPDATE-REVIEW-TEXT";
const sendLike = "SEND-LIKE";
const setProfile = "SET-PROFILE"
const SET_ID = "SET-ID"
const SET_STATUS = "SET-STATUS"
const IsLogin = "IS-LOGIN"
let initialState = {
    ReviewData: [
        {
            id: 1,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8KJh4iMd90SSfuNCU02ss6lX6CokNaWwzQ&usqp=CAU",
            likes: 1,
            message: "Hello, i am is a doctor"
        },
        {
            id: 2,
            avatar: "https://seedsouth.com/wp-content/uploads/2021/02/Elon-Musk-1999.jpg",
            likes: 14242343,
            message: "Hello, I'm Elon Mask"
        },
        {
            id: 3,
            avatar: "https://upload.wikimedia.org/wikipedia/commons/1/16/Emblem_of_National_Aviation_University.png",
            likes: -23423,
            message: "I'm Zubin"
        },
        {
            id: 4,
            avatar: "https://www.meme-arsenal.com/memes/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg",
            likes: 23423,
            message: "I love c#"
        },
    ],
    PersonalData:
        {
            photos: {
                "small": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
                "large": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
            },
            name: "Dmitriy Yefimchuk",
            city: "Bakhmach",
            born: "2003-01-12",
            education: "National Aviation University",
            site: "https://github.com/yefimchuk"
        },

    NewReviewText: "",
    Profile: null,
    id: null,
    isLogin: false,
    status: null,

}
export const ProfileReducer = (state: any = initialState, action: any) => {

    switch (action.type) {
        case addnewreview: {
            let NewReview = {
                id: 5,
                avatar: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
                likes: 1,
                message: state.NewReviewText
            }
            return {
                ...state,
                ReviewData: [...state.ReviewData, NewReview],
                NewReviewText: ''

            }
        }
        case IsLogin: {

            return {

                ...state, isLogin: action.isLogin
            }

        }
        case updatereviewtext: {
            return {
                ...state,
                NewReviewText: action.newText
            }
        }
        case SET_ID: {
            return {

                ...state,
                id: action.id.data.id
            }
        }
        case sendLike: {

            return {

                ...state,
                ReviewData: [...state.ReviewData].filter((el: any) =>

                    el.id === action.numberLikes.id ? el.likes++ : el.likes
                )

            }

        }
        case setProfile: {
            return {

                ...state,
                Profile: action.profile,
            }

        }
        case SET_STATUS: {
            return {

                ...state,
                status: action.status ,
            }

        }
        default:
            return state
    }
}
export const addReview = () => {
    return {type: addnewreview}
}
export const newTextReview = (text: string) => {
    return {type: updatereviewtext, newText: text}
}
export const like = (numberLikes: number) => {
    return {type: sendLike, numberLikes: numberLikes}
}
export const setNewProfile = (profile: any) => {
    return {type: setProfile, profile: profile}
}
export const setId = (id: object) => {
    return {type: SET_ID, id: id}
}
export const isLogin = (isLogin: boolean) => {
    return {type: IsLogin, isLogin: isLogin}
}
export const setStatus = (status: number) => {
    return {type: SET_STATUS, status: status}
}
//thunk

export const AuthMeThunk = (userId: any) => {

    return (dispatch: any) => {
        HeaderAPI.AuthMe().then((a: any) => {
            dispatch(setId(a))

            if (!userId) {

                userId = a.data.data.id
            }

            if (userId) {
                UsersAPI.SetMyId(userId).then((response: any) => {

                    dispatch(setNewProfile(response.data))

                })
            }
            UsersAPI.SetStatus(userId).then((response: any) => {

                dispatch(setStatus(response.data))
            })
        })


    }
}
export const SetStatusThunk = (id: number) => {
    return (dispatch: any) => {
        UsersAPI.SetStatus(id).then((response: any) => {

            dispatch(setStatus(response.data))
        })
    }
}
