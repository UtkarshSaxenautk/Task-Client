async function onDragEnd(event) {
    try {
      setActiveColumn(null);
      setActiveTask(null);

      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const isActiveAColumn = active.data.current?.type === "Column";
      if (!isActiveAColumn) return;

      console.log("DRAG END");

      const res = await axios.post(`http://localhost:8080/api/task/${activeTask.id}/moved`, {
      // Include the data you want to send in the request body
        name: activeTask.name,  // Example data
        listId: overId,
        done : activeTask.done,
      });
      console.log("result move : " , res)

      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
    catch (err) {
      console.log("error in dragging down : " , err)
    }
  }