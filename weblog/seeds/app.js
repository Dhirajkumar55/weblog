const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Category = require('../models/category');

mongoose.connect('mongodb://localhost:27017/we-blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected")
});

const seedDb = async() => {
    await Blog.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const blog = new Blog({
            title: 'My First ever blog',
            duration: Math.floor(Math.random() * 20) + 1,
            image: 'https://source.unsplash.com/collection/190727',
            body: "Preparing for coding interviews is no easy task. You need the skills to break down the problem and to deploy the right tools. The Educative Team has always been on the mission to make coding interview prep more accessible for engineers. We’ve learned firsthand that the best way to succeed is not to memorize 1,500+ LeetCode problems.\nThat’s why we want to approach interview prep a bit differently today by tackling some real-world problems faced by tech companies. Learning how to build real-world features (e.g. how to merge recommendations on Amazon) is more fun, and it’s much easier to remember what you learned that way. If you can understand a problem’s underlying pattern, you can apply it to just about any question.\nWe will dive into the solutions for a few common real-world coding problems and build five features. We will offer our solutions in Java.\nThis tutorial at a glance:\nNetflix feature: Group similar titles (hashmaps)\nFacebook feature: Friend circles (DFS)\nGoogle Calendar feature: Find meeting rooms (Heaps)\nAmazon feature: Products in price range (BST)\nTwitter feature: Add likes (Strings)\nWhere to go from here\n1. Netflix Feature: Group Similar Titles (hash maps)\nNetflix is one of the biggest video streaming platforms out there. The Netflix engineering team is always looking for new ways to display content. For this first problem, imagine you’re a developer on this team.\nTask: Our task here is to improve search results by enabling users to see relevant search results without being hindered by typos. We are calling this the “Group Similar Titles” feature.\nFirst, we need to determine how to individually group any character combination for a given title. Let’s imagine that our library has the following titles: \"duel,\" \"dule,\" \"speed,\" \"speed,\" \"deul,\" and \"cars.\" You are tasked to design a functionality so that if a user misspells a word (e.g. “speed” as “spede”), they will still be shown the correct title.\nFirst, we need to split our titles into sets of words so that the words in a set are anagrams. We have three sets: {\"duel\", \"dule\", \"deul\"},{\"speed\", \"spede\"}, and {\"cars\"}. The search results should include all members of the set that the string is found in. It’s best to pre-compute our sets rather than forming them when a user searches.\nCombining similar groups\nCombining similar groups\nThe members of each set have the same frequency of each alphabet, so the frequency of each alphabet in words in the same group is equal. For example, in our {{\"speed\", \"spede\"}} set, the frequency of the characters is the same in each word: s, p, e, and d.\nSo, how do we design and implement this functionality? Let’s break it down.\nFor each title, we need to compute a 26-element vector. Each vector element represents the frequency of an English letter in a title. We can represent frequency using a string that is fixed with # characters. This mapping process generates identical vectors for the strings that are anagrams. For example, we represent abbccc as #1#2#3#0#0#0...#0.\nWe then use this vector as a key for inserting titles into a hashmap. Our anagrams will all be mapped to the same entry. When a user searches a title or word, it should compute the 26-element English letter frequency vector based on input. It will then search the hashmap and return all the map entries using the vector.\nWe then store a list of calculated character counts as a key in a hashmap and assign a string as its value.\nEach value is an individual set, so we return the values of the hashmap.\nStoring sets in a key-value storage\nStoring sets in a key-value storage\nJava solution\n\nIf you want to see the solution in Python, check out the original post.\nComplexity measures\nTime complexity: O(n∗k) since we are counting each letter for each string in a list.\nSpace complexity: O(n∗k) since every string is stored as a value in the dictionary and the size of the string can be k.\n2. Facebook Feature: Friend Circles (DFS)\nFacebook is the biggest social media company in the world. They also own and operate Snapchat and Instagram. Pretend you are a Facebook engineer team and you are tasked to improve integration among their sister platforms.\nTask: Our task here is to find all the people on Facebook who are in a user’s friend circle. We are calling this the “Friend Circles” feature.\nWe need to first identify the people who are in each user’s friends circle, which includes users who are directly or indirectly friends with another user. Let’s assume there are n users on Facebook. The friendship connection is transitive.\nExample: If Nick is a direct friend of Amy, and Amy is a direct friend of Matt, then Nick is an indirect friend of Matt.\nWe will use an n*n square matrix. For example, cell [i,j] will hold value 1 if these users are friends. If not, the cell will hold the value 0. In the illustration below, there are two friend circles from the example above. Nick is only friends with Amy, but Amy is friends with Nick and Matt. This forms a friend circle. Mario makes another friend circle on his own.\nExample of friend circles\nThink of our symmetric input matrix as an undirected graph. Both the indirect and direct friends who are in one friend circle also exist in one connected component​ in our graph. This means that the number of connected graph components will give us how many friend circles we have.\nSo, our task is to find the number of connected components. We treat the input matrix as an adjacency matrix. So, how do we design and implement this? Let’s break it down.\nFirst, we initialize an array named visited. This will track the visited vertices of size n with 0 as the value for each index.\nThen, we traverse the graph using DFS if visited[v] is 0. If not, we move to the next v.\nThen, set visited[v] to 1 for every v that our DFS traversal runs into.\nWhen the DFS traversal is done, we should increment the circle counter by 1. This means that a connected component has been fully traversed.\nJava solution\n\nComplexity measures\nTime complexity: O(n​2​​) because we traverse the complete matrix of size n².\nSpace complexity: O(n) because the visited array that stores our visited users is of size n.\n3. Google Calendar Feature: Find Meeting Rooms (Heaps)\nThe Google Calendar tool is part of the GSuite used to manage events and reminders. Imagine you are a developer on the Google Calendar application team, and you’re tasked with implementing some productivity-enhancing features.\nTask: Your goal is to create a functionality for scheduling meetings. You need to determine and block the minimum number of meeting rooms for these meetings.\nTo do this, we are given some meeting times. We need to find a way to identify the number of meeting rooms needed to schedule them all. Each meeting will contain positive integers for a startTime and an endTime.\nOur meeting times can be listed as follows: {{2, 8}, {3, 4}, {3, 9}, {5, 11}, {8, 20}, {11, 15}}. We could schedule each meeting in a separate room, but we want to use the minimum amount of rooms. We observe that three meetings overlap: {2, 8}, {3, 4}, and {3, 9}. Therefore, at least these three will require separate rooms.\nMeeting times overlapping\nTo solve this, we use either a heap or priority queue for storing meeting times, using the end_time of each meeting as a key. The room at the top of our heap would become free earliest. If the meeting room from the top of the heap is not free, then no other room is free yet.\nSo, how do we build this functionality? Let’s break it down.\nSort the meetings by startTime.\nAllocate the first meeting to a room. Add the endTime as an entry in the heap.\nTraverse the other meetings and check if the meeting at the top has ended.\nIf the room is free, extract this element and add it to the heap again with the end time of the current meeting we want to process. If it is not free, allocate a new room and add it to our heap.\nAfter processing the list of meetings, the size of the heap will tell us how many rooms are allocated. This should be the minimum number of rooms we need.\nJava solution\n\nIf you want to see the solution in Python, check out the original post.\nComplexity measures\nTime complexity: O(n∗log(n))\nSpace complexity: O(n), where n is the number of meetings.\n4. Amazon Feature: Products in Price Range (BST)\nAmazon is the largest online store around the world, and they are always on the lookout for better ways to recommend products to their customers. Imagine you are a developer for Amazon’s store.\nTask: Implement a search filter to find products in a given price range. The product data is in the form of a binary search tree. The values are the prices of products.\nThe parameters we are working with are low and high, which represent a user’s price range. The example list of products below are mapped to their prices.\nExample list of products and prices\nThey are then stored in a binary search tree:\nBinary search tree\nWe can assume that the selected price range is low = 7 and high = 20, so our function solution should only return the prices {9, 8, 14, 20, 17}. So, how do we implement this? Let’s break it down.\n\n",
        });
        await blog.save();
    }
};

const seedCategory = async() => {
    await Category.deleteMany({});
    const travel = new Category({
        category: 'Travel'
    });
    await travel.save();

    const gaming = new Category({
        category: 'Gaming'
    });
    await gaming.save();

    const technology = new Category({
        category: 'Technology'
    });
    await technology.save();

    const food = new Category({
        category: 'Food'
    });
    await food.save();

    const literature = new Category({
        category: 'Literature'
    });
    await literature.save();

    const business = new Category({
        category: 'Business'
    });
    await business.save();

    const arts = new Category({
        category: 'Arts'
    });
    await arts.save();

    const education = new Category({
        category: 'Education'
    });
    await education.save();

    const social = new Category({
        category: 'Social'
    });
    await social.save();

    const health = new Category({
        category: 'Health'
    });
    await health.save();

}

// seedDb().then(() => {
//     mongoose.connection.close();
// });

seedCategory().then(() => {
    mongoose.connection.close();
})