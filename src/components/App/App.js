import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ArticleList from "../../pages/ArticleList/ArticleList";
import ArticlePage from "../../pages/ArticlePage/ArticlePage";
import PrivateRoute from "../PrivateRoute";
import NewArticle from "../../pages/NewArticle/NewArticle";
import EditArticle from "../../pages/EditArticle/EditArticle";
import EditProfile from "../../pages/EditProfile/EditProfile";
import MyArticles from "../../pages/MyArticles/MyArticles";
import Header from "../Header";
import SignUp from "../../pages/SignUp/SignUp";
import SignIn from "../../pages/SignIn/SignIn";
import styles from "./App.module.scss";

const App = () => (
  <>
    <header className={styles.header}>
      <Header />
    </header>

    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/articles" />
        </Route>
        <Route exact path="/articles" component={ArticleList} />
        <PrivateRoute exact path="/my-articles" component={MyArticles} />
        <PrivateRoute path="/articles/:slug/edit" component={EditArticle} />
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <PrivateRoute path="/profile" component={EditProfile} />
        <PrivateRoute exact path="/new-article" component={NewArticle} />
      </Switch>
    </main>
  </>
);

export default App;
