async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  const response = await fetch(url, options);
  return response.json();
}

export async function getRestaurants(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/restaurants?${params.toString()}`);
}

export async function getRestaurant(restaurantId) {
  return request(`/restaurants/${restaurantId}`);
}

export async function getRestaurantReviews(restaurantId, arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/restaurants/${restaurantId}/reviews?${params.toString()}`);
}
export async function fetchSeet(ID){
  //const respons =await fetch(`https://script.google.com/macros/s/AKfycbw4zJzFF37JfgUJLPdO3RrBkAwYXYCL3152lysmaEWXz1ybxZ8e044shqs9qe6eoM2R/exec`);
  const respons =await fetch(`https://script.google.com/macros/s/AKfycbx0byWvOCni2Xa9vDeYlCCyCj1l_IpkA7DLLVsDzHqOY__cHp4WoVMZw3tWkp6rGABg/exec?row=${ID}`);
  const data=await respons.json();
  return data;
}