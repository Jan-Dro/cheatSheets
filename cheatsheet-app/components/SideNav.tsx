interface SideNavProps {
    categories: string[];
    onSelect: (category: string) => void;
  }
  
  const SideNav: React.FC<SideNavProps> = ({ categories, onSelect }) => {
    return (
      <div>
        {categories.map(category => (
          <button key={category} onClick={() => onSelect(category)}>
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default SideNav;