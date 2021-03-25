const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { urlencoded } = require('body-parser');
const { v4: uuid } = require('uuid');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let blogs = [{
        id: 1,
        title: '7 signs you’re rich, even if it doesn’t feel like it',
        username: 'Business Insider',
        blog: "“Rich” can be just as subjective as “happy” — it’s different for everyone. But there are still a few universal indications of wealth.\nAn individual stands next to a white board.\nYou might actually be richer than you think. Photo: Klaus Vedfelt\/Getty Images\nBy Libby Kane\n“Rich” is relative.\nMaybe you think it means being in the top 1% of earners in some of the wealthiest cities in the US. Maybe it means being able to buy a flashy mansion or spend your life flitting from luxury vacation to luxury vacation.\nBut former investment banker Kristin Addis told Insider she feels richer earning about 40% of her previous six-figure salary while she travels the world. Nick and Dariece Swift, who also left their jobs to make a fraction of their former income, said they’re happier earning less. The self-made millionaire stars of “West Texas Investor’s Club” say their relationships are more valuable than the money they earn.\nUltimately, “rich” can ",
        comments:[{}],
        tags:['Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '9'
    },
    {
        id: 2,
        title: 'A quick way to build applications in python',
        username: 'dhiraj',
        blog: "Building Python applications that have graphical user interfaces and are doing sophisticated tasks might look difficult. In a recently published article (see the link below), I mentioned how only 7 Python libraries are needed to start building applications.\nBuild Your First Data Science Application\nSeven Python libraries to make your first data science MVP application.\ntowardsdatascience.com\n\nThis article will show you how to build a simple translation application in a few lines. I only use two Python libraries: requests and ipywidgets.\nBasics\nI chose to write a translator application as an example to show you how it is easy to build applications in Python. This application gets an English text and shows its Spanish translation. Very easy and straightforward.\nTo do so, we need two parts inside the application. The first part is a backend that does the translation, and the second part is a frontend or a graphical user interface (GUI) that interacts with the user (taking the input text and showing the output text).\nFor the backend, I use Azure Translation API. If you are not familiar with the concept of API (Application Programming Interface), I try to explain it in an effortless way. An API is a way (i.e., protocol) to ask a service (for example, translation) from a service provider (usually a server). For example, you can use ",
        comments:[{}],
        tags:['Travel','Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '10'
    },
    {
        id: 3,
        title: 'Crack coding interviews',
        username:'ritwik',
        blog: "Preparing for coding interviews is no easy task. You need the skills to break down the problem and to deploy the right tools. The Educative Team has always been on the mission to make coding interview prep more accessible for engineers. We’ve learned firsthand that the best way to succeed is not to memorize 1,500+ LeetCode problems.\nThat’s why we want to approach interview prep a bit differently today by tackling some real-world problems faced by tech companies. Learning how to build real-world features (e.g. how to merge recommendations on Amazon) is more fun, and it’s much easier to remember what you learned that way. If you can understand a problem’s underlying pattern, you can apply it to just about any question.\nWe will dive into the solutions for a few common real-world coding problems and build five features. We will offer our solutions in Java.\nThis tutorial at a glance:\nNetflix feature: Group similar titles (hashmaps)\nFacebook feature: Friend circles (DFS)\nGoogle Calendar feature: Find meeting rooms (Heaps)\nAmazon feature: Products in price range (BST)\nTwitter feature: Add likes (Strings)\nWhere to go from here\n1. Netflix Feature: Group Similar Titles (hash maps)\nNetflix is one of the biggest video streaming platforms out there. The Netflix engineering team is always looking for new ways to display content. For this first problem, imagine you’re a developer on this team.\nTask: Our task here is to improve search results by enabling users to see relevant search results without being hindered by typos. We are calling this the “Group Similar Titles”  ",
        comments:[{}],
        tags:['Travel','Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '7'
    },
    {
        id: 4,
        title: 'how do you do?',
        username: 'pokemon',
        blog: "“Rich” can be just as subjective as “happy” — it’s different for everyone. But there are still a few universal indications of wealth.\nAn individual stands next to a white board.\nYou might actually be richer than you think. Photo: Klaus Vedfelt\/Getty Images\nBy Libby Kane\n“Rich” is relative.\nMaybe you think it means being in the top 1% of earners in some of the wealthiest cities in the US. Maybe it means being able to buy a flashy mansion or spend your life flitting from luxury vacation to luxury vacation.\nBut former investment banker Kristin Addis told Insider she feels richer earning about 40% of her previous six-figure salary while she travels the world. Nick and Dariece Swift, who also left their jobs to make a fraction of their former income, said they’re happier earning less. The self-made millionaire stars of “West Texas Investor’s Club” say their relationships are more valuable than the money they earn.\nUltimately, “rich” can be just as subjective as “happy” — it’s different for everyone. However, there are a few universal indications of wealth, no matter how you view it.\n1. You can save mon",
        comments:[{}],
        tags:['Travel','Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '9'
    },
    {
        id: 5,
        title: 'Hello world',
        username: 'used to be',
        blog: "Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon!",
        comments:[{}],
        tags:['Travel','Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '10'
    },
    {
        id: 6,
        title: 'A quick way to build applications in python',
        username: 'Python nerd',
        blog: "A one sentence body paragraph that simply cites the example of George Washington or LeBron James is not enough, however. No, following this an effective essay will follow up on this topic sentence by explaining to the reader, in detail, who or what an example is and, more importantly, why that example is relevant.Even the most famous examples need context. For example, George Washington’s life was extremely complex – by using him as an example, do you intend to refer to his honesty, bravery, or maybe even his wooden teeth? The reader needs to know this and it is your job as the writer to paint the appropriate picture for them. To do this, it is a good idea to provide the reader with five or six relevant facts about the life (in general) or event (in particular) you believe most clearly illustrates your point.",
        comments:[{}],
        tags:['Travel','Gaming','Technology','Food','Literature','Business','Arts','Education','Social','Health'],
        dur: '10'
    },
]

function htmlToText(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}


app.get('/', (req, res) => {
    console.log(res.body);
    res.render('homepage');
})

app.get('/menu/login', (req, res) => {
    res.render('login');
})

app.get('/blogs', (req, res) => {

    res.render('home', { blogs });
})

app.get('/blogs/new', (req, res) => {
    res.render('newBlog');
})
const categories={
    Travel : [],
    Gaming: [],
    Technology:[],
    Food:[],
    Literature:[],
    Business:[],
    Arts:[],
    Education:[],
    Social:[],
    Health:[]
}

for (let i=0;i<blogs.length;i++)
{
    for (let j=0;j<blogs[i].tags.length;j++)
    {
        let tag=blogs[i].tags[j];
        categories[tag].push(blogs[i]);
    }
}
app.get('/categories/:id',(req,res)=>{
    const {id}=req.params;
    res.render('categories', {obj:categories[id]});
});

app.post('/blogs', (req, res) => {
    const { username, blogtext: blog, duration: dur, title } = req.body;
    blogs.push({ username, blog, dur, title, id: uuid() });
    res.redirect('/blogs');
})

app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const blog = blogs.find(blog => blog.id === id);
    res.render('show', { blog });
})

app.get('/blogs/:id/edit', (req, res) => {
    const { id } = req.params;
    const blog = blogs.find(blog => blog.id === id);
    res.render('edit', { blog });
})
app.get('/profile',(req,res)=>{
    res.render('profile');
})
app.get('/post',(req,res)=>{
    res.render('post',{ blogs });
})

app.patch('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const blogy = blogs.find(blog => blog.id === id);
    const newblog = req.body.blog;
    const newtitle = req.body.title;
    const newdur = req.body.duration;
    blogy.blog = newblog;
    blogy.title = newtitle;
    blogy.dur = newdur;
    res.redirect('/blogs');
})

app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    blogs = blogs.filter(blog => blog.id !== id);
    res.redirect('/blogs');
})


app.listen(8080, () => {})










