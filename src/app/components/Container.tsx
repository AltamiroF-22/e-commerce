"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto absolute top-0">
      {children}
    </div>
  );
};

export default Container;