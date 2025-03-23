// Fungsi helper untuk melakukan request ke API
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const baseUrl =
    process.env.NODE_ENV === "production" ? "https://your-netlify-site.netlify.app" : "http://localhost:8888"

  const url = `${baseUrl}/.netlify/functions/${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong")
  }

  return data
}

// Auth API
export async function loginUser(email: string, password: string) {
  return fetchAPI("auth", {
    method: "POST",
    body: JSON.stringify({ action: "login", email, password }),
  })
}

export async function registerUser(email: string, password: string, username: string) {
  return fetchAPI("auth", {
    method: "POST",
    body: JSON.stringify({ action: "register", email, password, username }),
  })
}

// Children API
export async function getChildren(userId: string) {
  return fetchAPI(`children?userId=${userId}`)
}

export async function addChild(userId: string, childData: any) {
  return fetchAPI("children", {
    method: "POST",
    body: JSON.stringify({ userId, childData }),
  })
}

// Nutrition API
export async function getNutrition(userId: string, date?: string) {
  let endpoint = `nutrition?userId=${userId}`
  if (date) {
    endpoint += `&date=${date}`
  }
  return fetchAPI(endpoint)
}

export async function addNutrition(userId: string, nutritionData: any) {
  return fetchAPI("nutrition", {
    method: "POST",
    body: JSON.stringify({ userId, nutritionData }),
  })
}

// Recipes API
export async function getRecipes(category?: string) {
  let endpoint = "recipes"
  if (category) {
    endpoint += `?category=${category}`
  }
  return fetchAPI(endpoint)
}

export async function getRecipeById(id: string) {
  return fetchAPI(`recipes?id=${id}`)
}

// Preferences API
export async function getPreferences(userId: string) {
  return fetchAPI(`preferences?userId=${userId}`)
}

export async function savePreferences(userId: string, preferences: string[]) {
  return fetchAPI("preferences", {
    method: "POST",
    body: JSON.stringify({ userId, preferences }),
  })
}

