import {
  LOGIN_DATA,
  PET_LIST,
  COUNTRY_LIST,
  STATE_LIST,
  CITY_LIST,
  CATEGORY_LIST,
  BREED_LIST,
  ALL_POSTS,
  ALLPETS_CATEGORY,
  USER_DATA,
  POSTS_BY_PETID,
  POSTS_COMMENTS,
  LOGIN_PET,
  PET_DETAILS,
  MATING_LIST,
  VACCINATION_LIST
} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logistical } from '../../utils';
import { Globals } from '../../Config/index';


export const LoginUser = (email, pass, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/UserLogin/UserLogin.php";
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', pass);

    console.log("FORMDATAAAAA", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
          AsyncStorage.setItem('token', responseJson.accessToken);
          AsyncStorage.setItem('Login_Data', JSON.stringify(responseJson));

          console.log(responseJson.accessToken, 'token');


          dispatch({
            type: LOGIN_DATA,
            payload: responseJson,
          });
          dispatch(userDetails(responseJson?.user_id));
          navigation.navigate('Auth')
          //   Alert.alert(response.response[0])
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const registerUser = (username, email, pass, gender, address, countryName, stateName, cityName, pincode, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/UserRegistration/UserRegistration.php";
    var formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', pass);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('country', countryName);
    formData.append('state', stateName);
    formData.append('city', cityName);
    formData.append('pincode', pincode);
    formData.append('device_token', 'erhge534y859748jejhejr893758jerrtretret');
    formData.append('device_type', 'Android');


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/UserRegistration/UserRegistration.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: formData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const petListing = (email, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/PetListing/RegisteredUserPetListing.php?email=${email}`;



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'HIMHIMHIMHIMHIMHIM');


          dispatch({
            type: PET_LIST,
            payload: responseJson?.Pet_List,
          });
          dispatch({
            type: LOGIN_PET,
            payload: responseJson?.Pet_List[0],
          });
          resolve(responseJson);
        } else {
          // Alert.alert(responseJson?.message);
          dispatch({
            type: PET_LIST,
            payload: null,
          });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};
export const petDetailsbyId = (id, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PetDetails/PetDetails.php";
    var formData = new FormData();
    formData.append('pet_id', id);

    console.log("PetDetailsPetDetailsID", formData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/PetDetails/PetDetails.php',
      headers: {
        // ...data.getHeaders()
      },
      data: formData
    };


    return axios.request(config)
      .then((responseJson) => {
        console.log(responseJson.data, 'petDetailspetDetailspetDetailspetDetails');

        if (responseJson.data.status == true) {


          dispatch({
            type: PET_DETAILS,
            payload: responseJson?.data.Output,
          });
          navigation.navigate('Profile', { petDetails: responseJson?.data?.Output[0] })
          resolve(responseJson);
        } else {
          dispatch({
            type: PET_DETAILS,
            payload: null,
          });
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const countryList = () => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CountryList/CountryList.php";



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'countrycountrycountry');


          dispatch({
            type: COUNTRY_LIST,
            payload: responseJson?.country_list,
          });

          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const stateList = (countryId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/StateList/StateList.php?country_id=${countryId}`;



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'statestatestatestate');


          dispatch({
            type: STATE_LIST,
            payload: responseJson?.state_list,
          });

          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const cityList = (stateId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/CityList/CityList.php?state_id=${stateId}`;



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'citycitycitycitycitycitycity');


          dispatch({
            type: CITY_LIST,
            payload: responseJson?.city_list,
          });

          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const categoryList = () => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CategoryList/CategoryList.php";



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("CategoryList", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'CategoryListCategoryListCategoryList');


          dispatch({
            type: CATEGORY_LIST,
            payload: responseJson?.Category_List,
          });

          resolve(responseJson);
        } else {
          console.log('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const breedList = (catId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/BreedList/BreedList.php?pet_category_id=${catId}`;


    console.log(url1, 'url1111')
    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'BREED_LISTBREED_LISTBREED_LIST');


          dispatch({
            type: BREED_LIST,
            payload: responseJson?.Breed_list,
          });

          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const allPetsPostListing = (email, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/AllPetsPostListing/AllPetsPostListing.php";
    var formData = new FormData();
    formData.append('user_login_email', email);

    console.log("allPetsPostListingFORMDATAAAAA", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("ALL_POSTSALL_POSTSALL_POSTS", responseJson);

        if (responseJson.status == true) {


          dispatch({
            type: ALL_POSTS,
            payload: responseJson?.Post_List,
          });
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};
export const petsPostListingbyID = (id, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PostListingByPetId/PostListingByPetId.php";
    var formData = new FormData();
    formData.append('pet_id', id);

    console.log("petsPostListingbyID", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("petsPostListingbyID", responseJson);

        if (responseJson.status == true) {


          dispatch({
            type: POSTS_BY_PETID,
            payload: responseJson?.Output,
          });
          resolve(responseJson);
        } else {
          dispatch({
            type: POSTS_BY_PETID,
            payload: null,
          });
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const postComment = (postId, petName, petImage, owner, commentMsg, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PostComment/PostComment.php";
    var formData = new FormData();
    formData.append('post_id', postId);
    formData.append('comments', commentMsg);
    formData.append('owner_email', owner);
    formData.append('pet_name', petName);
    formData.append('pet_image', petImage);


    console.log("PostCommentPostComment", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("petsPostListingbyID", responseJson);

        if (responseJson.status == true) {
          // Alert.alert(responseJson?.message);

          // dispatch({
          //   type: POSTS_BY_PETID,
          //   payload: responseJson?.Output,
          // });
          resolve(responseJson);
        } else {
          // dispatch({
          //   type: POSTS_BY_PETID,
          //   payload: null,
          // });
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const postShare = (petId, postId, msg, email, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/SharePost/SharePost.php";
    var data = new FormData();
    data.append('pet_id', petId);
    data.append('post_id', postId);
    data.append('share_status', '1');
    data.append('share_msg', msg);


    console.log("PostCommentPostComment", data);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: data,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("petsPostListingbyID", responseJson);

        if (responseJson.status == true) {
          // Alert.alert(responseJson?.message);
          dispatch(allPetsPostListing(email, navigation));
          // dispatch({
          //   type: POSTS_BY_PETID,
          //   payload: responseJson?.Output,
          // });
          resolve(responseJson);
        } else {
          // dispatch({
          //   type: POSTS_BY_PETID,
          //   payload: null,
          // });
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};
export const postCommentList = (postId, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CommentList/CommentList.php";
    var formData = new FormData();
    formData.append('post_id', postId);

    console.log("PostCommentPostComment", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("petsPostListingbyID", responseJson);

        if (responseJson.status == true) {

          dispatch({
            type: POSTS_COMMENTS,
            payload: responseJson?.Comment_list,
          });
          resolve(responseJson);
        } else {
          dispatch({
            type: POSTS_COMMENTS,
            payload: null,
          });
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};
export const AllPetsListingByCategory = cat_name => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/AllPetsListingByCategory/AllPetsListingByCategory.php?cat_name=${cat_name}`;



    return fetch(url1, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("AllPetsListingByCategory", responseJson);

        if (responseJson.status == true) {

          console.log(responseJson, 'AllPetsListingByCategoryAllPetsListingByCategory');


          dispatch({
            type: ALLPETS_CATEGORY,
            payload: responseJson?.all_Pets,
          });

          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
          dispatch({
            type: ALLPETS_CATEGORY,
            payload: null,
          })
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const logout = (email,navigation) => {
  return async (dispatch) => {
    try {
      // Clear token and Login_Data from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('Login_Data');

      // Update Redux state
      dispatch({
        type: LOGIN_DATA,
        payload: null,
      });

      // Reset the navigation stack and navigate to the Login screen
      navigation.navigate('Login');


    } catch (error) {
      console.error('Error during logout:', error);
      // Handle the error (optional)
    }
  };
};

export const registerPet = (petName, gender, categoryName, breedName, color, weight, unit, countryName, stateName, cityName, desc, image, email, pincode, year, month, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "PetRegistration/PetRegistration.php";
    let data = new FormData();
    data.append('petname', petName);
    data.append('gender', gender);
    data.append('category', categoryName);
    data.append('bread', breedName);
    data.append('color', color);
    data.append('weight', weight);
    data.append('unit', unit);
    data.append('Country', countryName);
    data.append('State', stateName);
    data.append('City', cityName);
    data.append('pincode', pincode);
    data.append('desc', desc);
    data.append('pet_image', image);
    data.append('email', email);
    data.append('year', year ? year : 0);
    data.append('month', month ? month : 0);

    console.log(data, 'formDattttaaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/PetRegistration/PetRegistration.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    return axios.request(config)
      .then((response) => {
        console.log(response, 'responseresponseresponse')
        if (response.data.status == true) {
          Alert.alert(response.data.message)
          dispatch(petListing(email, navigation));
          navigation.goBack()

        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};

export const petMatingRegister = (petName, age, categoryName, breedName, msg, imageBase64,gender, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "PetRegistration/PetRegistration.php";
    let data = new FormData();



    data.append('petname', petName);
    data.append('gender', gender);
    data.append('age', age);
    data.append('category', categoryName);
    data.append('breed', breedName);
    data.append('message', msg);
    data.append('pet_image', imageBase64)

    console.log(data, 'formDattttaaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/PetMatingRegistration/PetMatingRegistration.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    return axios.request(config)
      .then((response) => {
        console.log(response.data, 'responseresponseresponse')
        if (response.data.status == true) {
          // Alert.alert(response.data.message)
          dispatch(allMatingListing());
          // dispatch(petListing(email, navigation));
          // navigation.goBack()

        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};

export const deleteRegisterPet = (petId, email, navigation) => {
  return (dispatch, getState) => {
    let data = new FormData();
    data.append('pet_id', petId);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/DeletePet/DeletePet.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data, 'ddddddddd');
        if (response.data.status == true) {
          Alert.alert(response.data.message)
          dispatch(petListing(email, navigation));

        }
      })
      .catch((error) => {
        console.log(error);
      });

  };
};
export const deleteCategory = (catId, navigation) => {
  return (dispatch, getState) => {
    let data = new FormData();
    data.append('category_id', catId);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/DeletePetCategory/DeletePetCategory.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    console.log(data, 'foooooo')
    axios.request(config)
      .then((response) => {
        console.log(response.data, 'ddddddddd');
        if (response.data.status == true) {
          Alert.alert(response.data.message)
          dispatch(categoryList());
          // dispatch(petListing(email, navigation));

        }
      })
      .catch((error) => {
        console.log(error);
      });

  };
};
export const userDetails = (id) => {
  return (dispatch, getState) => {
    let data = new FormData();
    data.append('user_id', id);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/UserList/UserList.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    console.log(data, 'formdataprofile')
    axios.request(config)
      .then((response) => {
        console.log(response.data, 'profileUser');
        if (response.data.status == true) {
          dispatch({
            type: USER_DATA,
            payload: response?.data?.UserList,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };
};

export const addCategory = (name, image, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PetCategory/PetCategory.php";
    var formData = new FormData();
    formData.append('cat_name', name);
    formData.append('cat_image', image);



    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/PetCategory/PetCategory.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: formData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        dispatch(categoryList());
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const editCategory = (id, name, image, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/EditCategory/EditCategory.php";
    var formData = new FormData();
    formData.append('category_id', id);
    formData.append('cat_name', name);
    formData.append('cat_image', image);



    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/EditCategory/EditCategory.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: formData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        dispatch(categoryList());
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const updateUserProfile = (id, name, email, gender, image, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "UpdateUserProfile/UpdateUserProfile.php";
    var data = new FormData();
    data.append('user_id', id);
    data.append('username', name);
    data.append('email', email);
    data.append('gender', gender);
    data.append('userimg', image ? image : '');

    console.log(data, 'dtttttttt')

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/UpdateUserProfile/UpdateUserProfile.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        dispatch(userDetails(id));
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const searchByDistance = (id, distance, category, breed, year, month, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "SearchByDistance/SearchByDistance.php";
    var data = new FormData();
    data.append('logged_in_userId', id);
    data.append('distance', distance);
    data.append('category', category);
    data.append('breed', breed);
    if (year) {
      data.append('year', year ? year : 0);
    }
    if (month) {
      data.append('month', month ? month : 0);
    }




    console.log(data, 'dissssssssssssss')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/SearchByDistance/SearchByDistance.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data, 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        dispatch({
          type: ALLPETS_CATEGORY,
          payload: response?.data?.output,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const createPost = (id, name, cat_name, email, msg, image, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CreatePost/CreatePost.php";
    var data = new FormData();
    data.append('pet_id', id);
    data.append('pet_name', name);
    data.append('cat_name', cat_name);
    data.append('email', email);
    data.append('msg', msg);
    data.append('post_img', image ? image : '');

    console.log(data, 'dtttttttt')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/CreatePost/CreatePost.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        // Alert.alert(JSON.stringify(response.data?.message))
        dispatch(petsPostListingbyID(id, navigation));
        dispatch(allPetsPostListing(email, navigation));
        dispatch(petDetailsbyId(id, navigation));
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const deletePost = (postId, petId, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CreatePost/CreatePost.php";
    var data = new FormData();
    data.append('post_id', postId);

    console.log(data, 'dtttttttt')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/DeletePost/DeletePost.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
        dispatch(petsPostListingbyID(petId, navigation));
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};



export const likePost = (petId, postId, like, email, pet_name, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PostLikes/PostLikes.php";
    var data = new FormData();
    data.append('post_id', postId);
    data.append('pet_id', petId);
    data.append('likes', like);

    console.log(data, 'dtttttttt')
    console.log(pet_name, 'pet_namepet_namepet_name')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/PostLikes/PostLikes.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), 'hhh');
        // Alert.alert(JSON.stringify(response.data?.message))
        dispatch(allPetsPostListing(email, navigation));
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};
export const allMatingListing = (email, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/PetMatListing/PetMatAllListing.php";


    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      // body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("MAtingMatingMatingmAting", responseJson);

        if (responseJson.status == true) {


          dispatch({
            type: MATING_LIST,
            payload: responseJson?.Output?.reverse(),
          });
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const petMatingSorting = (categoryName, breedName, gender, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "SortPetMating/SortPetMating.php";
    let data = new FormData();



    data.append('category', categoryName);
    data.append('breed', breedName);
    data.append('gender', gender);

    console.log(data, 'formDattttaaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/SortPetMating/SortPetMating.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    return axios.request(config)
      .then((response) => {
        console.log(response.data, 'responseresponseresponse')
        if (response.data.status == true) {
          dispatch({
            type: MATING_LIST,
            payload: response.data?.Output,
          });
          // dispatch(allMatingListing());
          // dispatch(petListing(email, navigation));
          // navigation.goBack()

        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};

export const vaccinationSorting = (categoryName, age,navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "SortBookVaccination/SortBookVaccination.php";
    let data = new FormData();



    data.append('category', categoryName);
    data.append('age', age);


    console.log(data, 'formDattttaaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/SortBookVaccination/SortBookVaccination.php',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };
    return axios.request(config)
      .then((response) => {
        console.log(response.data, 'responseresponseresponse')
        if (response.data.status == true) {
          dispatch({
            type: VACCINATION_LIST,
            payload: response.data?.Output,
          });
          // dispatch(allMatingListing());
          // dispatch(petListing(email, navigation));
          // navigation.goBack()

        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};

export const bookVaccination = (formdata,pet_id, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "BookVaccination/BookVaccination.php";


    console.log(formdata, 'formDattttaaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://refuel.site/projects/socialzoo/API/BookVaccination/BookVaccination.php',
      headers: {
        // ...data.getHeaders()
      },
      data: formdata
    };
    return axios.request(config)
      .then((response) => {
        console.log(response.data, 'responseresponseresponse')
        if (response.data.status == true) {
          Alert.alert(response.data.message)
          dispatch(bookVaccinationList(pet_id, navigation));
          navigation.navigate('Vaccination')

        } else {
          Alert.alert(response.data.message)
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};

export const bookVaccinationList = (pet_id, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "BookVaccinationListByPetId/BookVaccinationListByPetId.php";


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://refuel.site/projects/socialzoo/API/BookVaccinationListByPetId/BookVaccinationListByPetId.php?pet_id=${pet_id}`,
      headers: {
        // ...data.getHeaders()
      },
      // data: data
    };
    return axios.request(config)
      .then((response) => {
        console.log(response.data, 'responseresponseresponse')
        if (response.data.status == true) {
          dispatch({
            type: VACCINATION_LIST,
            payload: response.data?.Output,
          });
          // dispatch(allMatingListing());
          // dispatch(petListing(email, navigation));
          // navigation.goBack()

        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };
};


