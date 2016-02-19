import React from 'react';
import { Link } from 'react-router';
import SearchBar from '../SearchBar';
import styles from './styles';

export default ({ title = 'App Name', urls = [], location }) => {

  urls = urls.map(url => <li style={styles.navItems} key={url.url}><Link to={url.url} >{url.title}</Link></li>);

  return (
    <header className="Header" style={styles.wrapper}>

      <div style={styles.flexBox}>
        <Link style={styles.login}to="/login">Login</Link>
        <h1 style={styles.heading}><Link to="/">{title}</Link></h1>
        <SearchBar style={styles.searchBar}/>
      </div>

      <nav style={styles.navWrapper}>
        <ul style={styles.flexBox} > {urls} </ul>
      </nav>

    </header>
  );
};