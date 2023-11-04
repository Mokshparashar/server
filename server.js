import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
const app = express();
import morgan from "morgan";

let taskList = [
  {
    id: nanoid(),
    title: "programming with Typescript",
    total: 5300,
    img: "https://pbs.twimg.com/card_img/1717059458009075712/M_E5xnVG?format=png&name=small",
    searchingWord: "typescript",
  },
  {
    id: nanoid(),
    title: "NextJs-frontend toolkit",
    total: 568,
    img: "https://blog.logrocket.com/wp-content/uploads/2021/09/next-js-automatic-image-optimization-next-image.png",
    searchingWord: "nextjs",
  },
  {
    id: nanoid(),
    title: "C++ programming",
    total: 4545,
    img: "https://c4.wallpaperflare.com/wallpaper/935/690/342/c-plus-plus-c-code-wallpaper-thumb.jpg",
    searchingWord: "c++",
  },
  {
    id: nanoid(),
    title: "Golang-write low latency code",
    total: 7845,
    img: "https://www.freecodecamp.org/news/content/images/2021/10/golang.png",
    searchingWord: "golang",
  },
  {
    id: nanoid(),
    title: "Rust-secure and fast programming",
    total: 5635,
    img: "https://www.akuaroworld.com/wp-content/uploads/2019/10/rust-banner.png",
    searchingWord: "rust",
  },
  {
    id: nanoid(),
    title: "Java programming",
    total: 4852,
    img: "https://www.webskittersacademy.in/wp-content/uploads/2016/01/Java-As-A-Programming-Language.png",
    searchingWord: "java",
  },
];

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server...</h1>");
});

app.get("/api/tasks", (req, res) => {
  res.json(taskList);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ msg: "please provide title" });
    return;
  }
  const newTask = { id: nanoid(), title, isDone: false };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
});

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone };
    }
    return task;
  });

  res.json({ msg: "task updated" });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  taskList = taskList.filter((task) => task.id !== id);

  res.json({ msg: "task removed" });
});

app.use((req, res) => res.status(404).send("Route does not exist"));

const port = process.env.PORT || 5000;

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();
