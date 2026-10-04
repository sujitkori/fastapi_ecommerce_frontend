export const getImageUrl = (imagePath:string | null) => {
    if (!imagePath){
        return "";
    }

    return `${import.meta.env.VITE_API_BASE_URL}/${imagePath}`
}

// NOTE: The backend is returning the database path, not the full browser URL. 
// That's why we are converting it into full Browser url with the above method getImageUrl.