import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import ActionItem from './ActionItem';

const ActionListContainer = styled.div`
  margin-top: 2rem;
`;

const SortableActionItem = ({ action, onUpdate, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = () => {
    onRemove(action.id);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ActionItem
        action={action}
        onUpdate={onUpdate}
        onRemove={handleRemove}
      />
    </div>
  );
};

const ActionList = ({ actions, onUpdate, onRemove, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = actions.findIndex((action) => action.id === active.id);
      const newIndex = actions.findIndex((action) => action.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <ActionListContainer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={actions.map((action) => action.id)}
          strategy={verticalListSortingStrategy}
        >
          {actions.map((action) => (
            <SortableActionItem
              key={action.id}
              action={action}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ActionListContainer>
  );
};

export default ActionList; 