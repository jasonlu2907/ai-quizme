interface ProgressBarProps {
  value: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div className='block w-full bg-secondary rounded-full h-2.5'>
      <div
        className='bg-slate-700 h-2.5 rounded-md'
        style={{
          width: `${props.value}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
