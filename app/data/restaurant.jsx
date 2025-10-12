// file: data/restaurants.js

export const allRestaurants = [
    // American Food / Fast Food
    {
      id: 1,
      name: "KFC",
      branch: "PTT Bang Waek",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
      slug: "kfc-ptt-bang-waek",
      type: "American Food",
      reviewCount: "7,161",
      distance: 1.5,
      menu: [
        {
          category: "Appetizers",
          items: [
            { id: 'kfc1', name: "Shrimp Donuts", price: "฿55", image: "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20230526084013014161/photo/1e17af29314545239587a87332f143d1_1685086813797699316.jpg" },
            { id: 'kfc4', name: "Mashed Potato (Regular)", price: "฿59", image: "https://s3-ap-southeast-1.amazonaws.com/kfc-web-ordering-image-prod/kfc-web/th/product/Mashed-Potato.png" },
            { id: 'kfc5', name: "7 pcs. Chicken Pop", price: "฿55", image: "https://kfc-web-ordering-image-prod.s3.ap-southeast-1.amazonaws.com/kfc-web/th/product/7-Chicken-Pop.png" },
          ]
        },
        {
          category: "Fried Chicken",
          items: [
            { id: 'kfc2', name: "1 pc. Fried Chicken", price: "฿55", image: "https://s3-ap-southeast-1.amazonaws.com/kfc-web-ordering-image-prod/kfc-web/th/product/1-Fried-Chicken.png" },
            { id: 'kfc3', name: "Jai Yai Bucket", price: "฿369", image: "https://kfc-web-ordering-image-prod.s3.ap-southeast-1.amazonaws.com/kfc-web/th/product/Jai-Yai-2.png" },
          ]
        },
        {
          category: "Desserts",
          items: [
            { id: 'kfc6', name: "Egg Tart", price: "฿42", image: "https://s3-ap-southeast-1.amazonaws.com/kfc-web-ordering-image-prod/kfc-web/th/product/Egg-Tart.png" },
          ]
        }
      ]
    },
    {
      id: 8,
      name: "Bonchon",
      branch: "Siam Center",
      rating: 4.8,
      image: "https://images.pexels.com/photos/60616/appetizer-bread-food-health-60616.jpeg",
      slug: "bonchon-siam-center",
      type: "American Food",
      reviewCount: "7,191",
      distance: 7.2,
      menu: [
          {
              category: "Bonchon Chicken",
              items: [
                  { id: 'bon1', name: "6 pcs. Wings", price: "฿175", image: "https://images.pexels.com/photos/10798226/pexels-photo-10798226.jpeg" },
                  { id: 'bon2', name: "5 pcs. Thighs", price: "฿175", image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg" },
              ]
          },
          {
              category: "Appetizers",
              items: [
                  { id: 'bon3', name: "Gyoza", price: "฿135", image: "https://images.pexels.com/photos/7064375/pexels-photo-7064375.jpeg" },
              ]
          }
      ]
    },
    {
      id: 5,
      name: "The Pizza Company",
      branch: "Central Rama 2",
      rating: 4.3,
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      slug: "the-pizza-company-rama-2",
      type: "American Food",
      reviewCount: "7,101",
      distance: 4.8,
      menu: [
        {
          category: "Pizza",
          items: [
            { id: 'piz1', name: "Hawaiian", price: "฿359", image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg" },
            { id: 'piz2', name: "Pepperoni", price: "฿329", image: "https://images.pexels.com/photos/8251159/pexels-photo-8251159.jpeg" },
          ]
        },
        {
          category: "Appetizers",
          items: [
            { id: 'piz4', name: "BBQ Chicken Wings", price: "฿129", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg" },
            { id: 'piz5', name: "Garlic Bread", price: "฿79", image: "https://images.pexels.com/photos/236737/pexels-photo-236737.jpeg"},
          ]
        }
      ]
    },
  
    // Thai Food
    {
      id: 2,
      name: "Suki Teenoi",
      branch: "Srinakarin",
      rating: 4.6,
      image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
      slug: "suki-teenoi-srinakarin",
      type: "Thai Food",
      reviewCount: "7,121",
      distance: 3.2,
      menu: [
          {
              category: "Beef",
              items: [
                  { id: 'suki1', name: "US Beef Set", price: "฿219", image: "https://images.pexels.com/photos/6107767/pexels-photo-6107767.jpeg" },
                  { id: 'suki3', name: "Shank Beef", price: "฿89", image: "https://images.pexels.com/photos/3997424/pexels-photo-3997424.jpeg" },
              ]
          },
          {
              category: "Pork",
              items: [
                  { id: 'suki2', name: "Pork Belly", price: "฿59", image: "https://images.pexels.com/photos/19082305/pexels-photo-19082305.jpeg" },
                  { id: 'suki4', name: "Pork in Bamboo", price: "฿69", image: "https://images.pexels.com/photos/8844610/pexels-photo-8844610.jpeg" },
              ]
          }
      ]
    },
    {
      id: 9,
      name: "Jay Oh",
      branch: "Banthat Thong",
      rating: 4.9,
      image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
      slug: "jay-oh-banthat-thong",
      type: "Thai Food",
      reviewCount: "7,166",
      distance: 8.1,
      menu: [
          {
              category: "Signature Dishes",
              items: [
                  { id: 'jay1', name: "Mama Oho (Tom Yum Noodles)", price: "฿180", image: "https://images.pexels.com/photos/1152220/pexels-photo-1152220.jpeg" },
                  { id: 'jay2', name: "Spicy Salmon Salad", price: "฿250", image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg" },
                  { id: 'jay3', name: "Crispy Pork", price: "฿120", image: "https://images.pexels.com/photos/6042457/pexels-photo-6042457.jpeg" },
              ]
          }
      ]
    },
    
    // Japanese Food
    {
      id: 3,
      name: "Sushi Hiro",
      branch: "The Promenade",
      rating: 4.9,
      image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
      slug: "sushi-hiro-the-promenade",
      type: "Japanese Food",
      distance: 5.5,
      reviewCount: "7,221",
      menu: [
          {
              category: "Sushi",
              items: [
                  { id: 'hiro1', name: "Salmon Sushi", price: "฿60", image: "https://images.pexels.com/photos/10592751/pexels-photo-10592751.jpeg" },
                  { id: 'hiro2', name: "Tuna Sushi", price: "฿80", image: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg" },
              ]
          },
          {
              category: "Rolls",
              items: [
                  { id: 'hiro3', name: "California Roll", price: "฿250", image: "https://images.pexels.com/photos/7631333/pexels-photo-7631333.jpeg" },
              ]
          }
      ]
    },
    {
      id: 7,
      name: "Hachiban Ramen",
      branch: "Future Park",
      rating: 4.4,
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
      slug: "hachiban-ramen-future-park",
      type: "Japanese Food",
      reviewCount: "7,161",
      distance: 10.5,
      menu: [
          {
              category: "Ramen",
              items: [
                  { id: 'hachi1', name: "Kara-Men", price: "฿98", image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg" },
                  { id: 'hachi2', name: "Tom Yum Chashu-Men", price: "฿113", image: "https://images.pexels.com/photos/2706820/pexels-photo-2706820.jpeg" },
              ]
          },
          {
              category: "Appetizers",
              items: [
                  { id: 'hachi3', name: "Gyoza", price: "฿78", image: "https://images.pexels.com/photos/11105479/pexels-photo-11105479.jpeg" },
              ]
          }
      ]
    },
  
    // Chinese Food
    {
      id: 10,
      name: "HOTPOT MAN",
      branch: "Banthat Thong",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1487532/pexels-photo-1487532.jpeg",
      slug: "hotpot-man-banthat-thong",
      type: "Chinese Food",
      reviewCount: "7,678",
      distance: 8.3,
      menu: [
          {
              category: "Mala Hotpot Sets",
              items: [
                  { id: 'hotpot1', name: "Pork Set", price: "฿299", image: "https://images.pexels.com/photos/5934376/pexels-photo-5934376.jpeg" },
                  { id: 'hotpot2', name: "Beef Set", price: "฿399", image: "https://images.pexels.com/photos/7627420/pexels-photo-7627420.jpeg" },
              ]
          }
      ]
    },
    {
      id: 11,
      name: "Jok Samyan",
      branch: "Samyan Mitrtown",
      rating: 4.5,
      image: "https://images.pexels.com/photos/10790638/pexels-photo-10790638.jpeg",
      slug: "jok-samyan-mitrtown",
      type: "Chinese Food",
      reviewCount: "7,161",
      distance: 0.8,
      menu: [
          {
              category: "Congee",
              items: [
                  { id: 'jok1', name: "Pork Congee", price: "฿50", image: "https://images.pexels.com/photos/13105779/pexels-photo-13105779.jpeg" },
                  { id: 'jok2', name: "Pork Congee with Egg", price: "฿60", image: "https://images.pexels.com/photos/14878567/pexels-photo-14878567.jpeg" },
              ]
          }
      ]
    },
  
    // Dessert
    {
      id: 4,
      name: "After You",
      branch: "Siam Paragon",
      rating: 4.8,
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      slug: "after-you-siam-paragon",
      type: "Dessert",
      reviewCount: "7,161",
      distance: 6.1,
      menu: [
          {
              category: "Toast",
              items: [
                  { id: 'after1', name: "Shibuya Honey Toast", price: "฿195", image: "https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg" },
              ]
          },
          {
              category: "Kakigori",
              items: [
                  { id: 'after2', name: "Thai Tea Kakigori", price: "฿265", image: "https://images.pexels.com/photos/5741147/pexels-photo-5741147.jpeg" },
              ]
          }
      ]
    },
    {
      id: 12,
      name: "Swensen's",
      branch: "Central Westgate",
      rating: 4.5,
      image: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg",
      slug: "swensens-central-westgate",
      type: "Dessert",
      reviewCount: "7,161",
      distance: 2.5,
      menu: [
          {
              category: "Sundae",
              items: [
                  { id: 'swen1', name: "Chocolate Sundae", price: "฿89", image: "https://images.pexels.com/photos/103565/pexels-photo-103565.jpeg" },
                  { id: 'swen2', name: "Strawberry Sundae", price: "฿89", image: "https://images.pexels.com/photos/1232141/pexels-photo-1232141.jpeg" },
              ]
          }
      ]
    },
  
    // Beverage
    {
      id: 6,
      name: "ChaTraMue",
      branch: "MBK Center",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg",
      slug: "cha-tra-mue-mbk",
      type: "Beverage",
      reviewCount: "7,161",
      distance: 7.0,
      menu: [
          {
              category: "Drinks",
              items: [
                  { id: 'cha1', name: "Thai Tea", price: "฿50", image: "https://images.pexels.com/photos/8695574/pexels-photo-8695574.jpeg" },
                  { id: 'cha2', name: "Rose Tea", price: "฿55", image: "https://images.pexels.com/photos/10864380/pexels-photo-10864380.jpeg" },
              ]
          }
      ]
    },
];