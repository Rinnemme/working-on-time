export default function NoTasks({ addTask }: { addTask: () => void }) {
  return (
    <div
      onClick={addTask}
      className="border w-6/12 border-wot-light-gray rounded-lg border-dashed relative flex flex-col py-4 px-2 justify-center items-center hover:cursor-pointer active:scale-95 hover:bg-white hover:shadow-sm"
    >
      <div className="font-semibold text-wot-rose text-lg hover:cursor-pointer">
        No Tasks Yet
      </div>
      <div className="font-regular hover:cursor-pointer">
        Click to add a task
      </div>
    </div>
  );
}
