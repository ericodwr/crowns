import './directory-item.styles.scss';
import { Link } from 'react-router-dom';
import { DirectoryCategoryItem } from '../directory/Directory';

const DirectoryItem = ({ category }: { category: DirectoryCategoryItem }) => {
  const { title, id, imageUrl } = category;

  return (
    <div className="directory-item-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Link to={`/shop/${title}`} className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default DirectoryItem;
