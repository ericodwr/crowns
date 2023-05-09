import DirectoryItem from '../category-item/DirectoryItem';
import jsonData from '../../categories.json';

import './categories.styles.scss';

export type DirectoryCategoryItem = {
  id: number;
  title: string;
  imageUrl: string;
};

const Directory = () => {
  return (
    <div className="categories-container">
      {jsonData.map((category: DirectoryCategoryItem) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
