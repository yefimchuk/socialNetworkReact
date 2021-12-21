import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import photo from "../../img/—Pngtree—vector avatar icon_4013749.png";
import {HeaderAPI, ProfileAPI, UsersAPI} from "../../API/API";


export const GetNewProfile: any = createAsyncThunk(
    'profilePage/getNewProfile',
    async (id: number, {dispatch}) => {

        if (!id) {
            const auth = await HeaderAPI.AuthMe()
            dispatch(setId(auth.data.data.id))
            let profile = await UsersAPI.SetMyId(auth.data.data.id)
            let status = await dispatch(GetStatusThunk(auth.data.data.id))
            return [status.payload, profile]
        }
        let profile = await UsersAPI.SetMyId(id)
        let status = await dispatch(GetStatusThunk({id}))
        return [status.payload, profile]

    })

export const AuthMeThunk: any = createAsyncThunk("profile/authMe",
    async (userId: number, {dispatch}) => {

        let response = await HeaderAPI.AuthMe()
        dispatch(setId(response.data.data.id))

    })

export const GetStatusThunk: any = createAsyncThunk("profile/getStatus",
    async (id: number, {dispatch}) => {

        if (!id) {
            let response = await HeaderAPI.AuthMe()
            dispatch(setId(response.data.data.id))
            let statusResponse = await ProfileAPI.SetStatus(response.data.data.id)
            if (statusResponse.data !== null) {
                return statusResponse.data
            }
        }

        let response = await ProfileAPI.SetStatus(id)
        if (response.data === null) {
            response.data = ""
        }
        return (response.data)
    })

export const UpdateStatusThunk: any = createAsyncThunk("profile/getStatus",
    async (status: string, {dispatch}) => {

        await HeaderAPI.AuthMe()

        let response = await ProfileAPI.UpdateStatus(status)
        if (response.data.resultCode === 0) {
            return status
        }


    }
)

type ProfileType = {
    ReviewData: object[],
    PersonalData: object,
    Profile: object
    id: number | null,
    isLogin: boolean,
    status: string,
    isLoading: boolean
}

export const profilePage = createSlice({
    name: 'profilePage',
    initialState: {
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
        Profile: {
            fullName: null,
            photos: {
                large: null,
            },
            lookingForAJobDescription: null,
            contacts: {
                instagram: null,
                youtube: null,
                mainLink: null,
            }
        },
        id: null,
        isLogin: false,
        status: "",
        isLoading: false

    } as ProfileType,
    reducers: {
        addNewReview: (state, action) => {
            let NewReview = {
                id: 5,
                avatar: photo,
                likes: 1,
                message: action.payload.NewReviewText
            }
            return {
                ...state,
                ReviewData: [...state.ReviewData, NewReview],
                NewReviewText: ''

            }
        },
        sendLike: (state, action) => {

            debugger

            state.ReviewData.filter((el: any) =>

                el.id === action.payload.id ? el.likes++ : el.likes
            )


        },
        setId: (state, action) => {

            return {
                ...state,
                id: action.payload
            }
        },
        isLogin: (state, action) => {
            return {
                ...state, isLogin: action.payload
            }
        }
    },
    extraReducers: {
        [GetNewProfile.fulfilled]: (state, action) => {
            state.status = action.payload[0]
            state.Profile = action.payload[1].data
        },

        [GetStatusThunk.fulfilled]: (state, action) => {

            state.status = action.payload
        },

        [UpdateStatusThunk.fulfilled]: (state, action) => {

            state.status = action.payload
        },
    },
},)

export const {setId, addNewReview, sendLike,} = profilePage.actions