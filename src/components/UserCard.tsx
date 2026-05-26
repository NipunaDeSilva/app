type UserCardProps = {
    name: string;
    age: number;
    course: string;
};

export default function UserCard({
    name,
    age, course,
}: UserCardProps) {
    return(
        <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
    </div>
    );
}