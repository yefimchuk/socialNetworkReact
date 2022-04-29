import { createSelector } from "reselect";

export const getSliceProfileSelector = createSelector(
  (state: any) => state,
  (state) => state.sliceProfile
);
export const getProfileSelector = createSelector(
    (state:any) => state,
    (state) => state.sliceProfile.Profile
)
export const getErrorMessageSelector = createSelector(
    (state:any) => state,
    (state) => state.sliceProfile.errorMessage
)