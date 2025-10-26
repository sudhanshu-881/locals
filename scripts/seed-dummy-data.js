import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Indian metro cities with coordinates
const cities = [
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
]

// Service provider data
const providers = [
  { firstName: "Rajesh", lastName: "Kumar", skills: ["Electrical", "Wiring"], city: "Delhi", rate: 500 },
  { firstName: "Priya", lastName: "Singh", skills: ["Plumbing", "Repairs"], city: "Delhi", rate: 400 },
  { firstName: "Amit", lastName: "Patel", skills: ["Carpentry", "Furniture"], city: "Mumbai", rate: 600 },
  { firstName: "Neha", lastName: "Sharma", skills: ["Interior Design", "Decoration"], city: "Mumbai", rate: 800 },
  { firstName: "Vikram", lastName: "Reddy", skills: ["AC Repair", "Maintenance"], city: "Bangalore", rate: 550 },
  { firstName: "Anjali", lastName: "Gupta", skills: ["Tutoring", "Math"], city: "Bangalore", rate: 300 },
  { firstName: "Suresh", lastName: "Rao", skills: ["Plumbing", "Installation"], city: "Hyderabad", rate: 450 },
  { firstName: "Divya", lastName: "Nair", skills: ["Fitness Training", "Yoga"], city: "Hyderabad", rate: 700 },
  { firstName: "Karthik", lastName: "Iyer", skills: ["Web Design", "Development"], city: "Chennai", rate: 1000 },
  { firstName: "Sneha", lastName: "Desai", skills: ["Photography", "Editing"], city: "Chennai", rate: 900 },
  { firstName: "Arjun", lastName: "Banerjee", skills: ["Electrical", "Installation"], city: "Kolkata", rate: 480 },
  { firstName: "Pooja", lastName: "Chatterjee", skills: ["Cooking", "Catering"], city: "Kolkata", rate: 600 },
  { firstName: "Rohan", lastName: "Kulkarni", skills: ["Plumbing", "Repairs"], city: "Pune", rate: 420 },
  { firstName: "Shreya", lastName: "Joshi", skills: ["Graphic Design", "Branding"], city: "Pune", rate: 850 },
  { firstName: "Nikhil", lastName: "Shah", skills: ["Carpentry", "Woodwork"], city: "Ahmedabad", rate: 550 },
  { firstName: "Isha", lastName: "Verma", skills: ["Tutoring", "English"], city: "Ahmedabad", rate: 350 },
  { firstName: "Sanjay", lastName: "Mishra", skills: ["Electrical", "Wiring"], city: "Delhi", rate: 520 },
  { firstName: "Kavya", lastName: "Menon", skills: ["Interior Design", "Consultation"], city: "Mumbai", rate: 750 },
  { firstName: "Arun", lastName: "Krishnan", skills: ["AC Repair", "Installation"], city: "Bangalore", rate: 600 },
  { firstName: "Ritika", lastName: "Saxena", skills: ["Fitness Training", "Nutrition"], city: "Hyderabad", rate: 650 },
  { firstName: "Deepak", lastName: "Pandey", skills: ["Plumbing", "Maintenance"], city: "Chennai", rate: 400 },
  { firstName: "Ananya", lastName: "Roy", skills: ["Photography", "Videography"], city: "Kolkata", rate: 950 },
  { firstName: "Varun", lastName: "Tripathi", skills: ["Web Development", "Design"], city: "Pune", rate: 1100 },
  { firstName: "Zara", lastName: "Khan", skills: ["Cooking", "Baking"], city: "Ahmedabad", rate: 550 },
]

// Service seekers
const seekers = [
  { firstName: "Rahul", lastName: "Sharma", city: "Delhi" },
  { firstName: "Priya", lastName: "Kapoor", city: "Mumbai" },
  { firstName: "Arjun", lastName: "Nair", city: "Bangalore" },
]

// Service categories
const serviceCategories = [
  "Electrical Work",
  "Plumbing",
  "Carpentry",
  "Interior Design",
  "AC Repair",
  "Tutoring",
  "Fitness Training",
  "Photography",
  "Web Development",
  "Cooking",
]

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Create auth users and profiles for providers
    const createdUsers = []

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i]
      const email = `provider${i + 1}@locals.test`
      const password = "TestPassword123!"

      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })

        if (authError) {
          console.log(`User ${email} might already exist, skipping...`)
          continue
        }

        const userId = authData.user.id
        const city = cities.find((c) => c.name === provider.city)

        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          email,
          first_name: provider.firstName,
          last_name: provider.lastName,
          city: provider.city,
          latitude: city.lat + (Math.random() - 0.5) * 0.1,
          longitude: city.lng + (Math.random() - 0.5) * 0.1,
          skills: provider.skills,
          hourly_rate: provider.rate,
          user_type: "service_provider",
          is_verified: true,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider.firstName}`,
          bio: `Professional ${provider.skills[0]} service provider in ${provider.city}`,
        })

        if (profileError) throw profileError

        createdUsers.push({ userId, email, ...provider })
        console.log(`✓ Created provider: ${provider.firstName} ${provider.lastName}`)
      } catch (error) {
        console.error(`Error creating provider ${provider.firstName}:`, error.message)
      }
    }

    // Create auth users and profiles for seekers
    for (let i = 0; i < seekers.length; i++) {
      const seeker = seekers[i]
      const email = `seeker${i + 1}@locals.test`
      const password = "TestPassword123!"

      try {
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })

        if (authError) {
          console.log(`User ${email} might already exist, skipping...`)
          continue
        }

        const userId = authData.user.id
        const city = cities.find((c) => c.name === seeker.city)

        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          email,
          first_name: seeker.firstName,
          last_name: seeker.lastName,
          city: seeker.city,
          latitude: city.lat + (Math.random() - 0.5) * 0.1,
          longitude: city.lng + (Math.random() - 0.5) * 0.1,
          user_type: "service_seeker",
          is_verified: true,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeker.firstName}`,
          bio: `Looking for quality services in ${seeker.city}`,
        })

        if (profileError) throw profileError

        createdUsers.push({ userId, email, ...seeker })
        console.log(`✓ Created seeker: ${seeker.firstName} ${seeker.lastName}`)
      } catch (error) {
        console.error(`Error creating seeker ${seeker.firstName}:`, error.message)
      }
    }

    // Add services for providers
    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i]
      const user = createdUsers.find((u) => u.firstName === provider.firstName && u.lastName === provider.lastName)

      if (!user) continue

      for (let j = 0; j < provider.skills.length; j++) {
        const skill = provider.skills[j]
        const { error } = await supabase.from("services").insert({
          provider_id: user.userId,
          title: skill,
          description: `Professional ${skill} services in ${provider.city}`,
          category: skill,
          hourly_rate: provider.rate,
          is_active: true,
        })

        if (error) console.error(`Error creating service:`, error.message)
      }
    }

    // Add ratings and reviews
    const providerUsers = createdUsers.filter((u) => u.user_type === "service_provider")
    const seekerUsers = createdUsers.filter((u) => u.user_type === "service_seeker")

    for (let i = 0; i < Math.min(providerUsers.length, 12); i++) {
      const provider = providerUsers[i]
      const seeker = seekerUsers[i % seekerUsers.length]

      const rating = Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
      const reviews = [
        "Excellent work! Very professional and punctual.",
        "Great service, highly recommended!",
        "Very satisfied with the work quality.",
        "Professional and reliable service provider.",
        "Completed the work on time and within budget.",
      ]

      const { error } = await supabase.from("ratings").insert({
        provider_id: provider.userId,
        reviewer_id: seeker.userId,
        rating,
        review: reviews[Math.floor(Math.random() * reviews.length)],
      })

      if (error) console.error(`Error creating rating:`, error.message)
    }

    // Add messages between users
    for (let i = 0; i < Math.min(providerUsers.length, 8); i++) {
      const provider = providerUsers[i]
      const seeker = seekerUsers[i % seekerUsers.length]

      const messages = [
        "Hi, are you available for work this weekend?",
        "What is your availability for next week?",
        "Can you provide a quote for the work?",
        "Thank you for the excellent service!",
        "When can you start the project?",
      ]

      for (let j = 0; j < 2; j++) {
        const { error } = await supabase.from("messages").insert({
          sender_id: j === 0 ? seeker.userId : provider.userId,
          recipient_id: j === 0 ? provider.userId : seeker.userId,
          content: messages[Math.floor(Math.random() * messages.length)],
          is_read: Math.random() > 0.3,
        })

        if (error) console.error(`Error creating message:`, error.message)
      }
    }

    console.log("\n✓ Database seeding completed successfully!")
    console.log(`\nTest Credentials:`)
    console.log(`Provider: provider1@locals.test / TestPassword123!`)
    console.log(`Seeker: seeker1@locals.test / TestPassword123!`)
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()
