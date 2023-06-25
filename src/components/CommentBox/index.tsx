import { formattedDate } from '../../utils/formattedDate';

interface Props {
  comment: any[] | undefined;
}

const CommentBox = ({ comment }: Props) => {
  return (
    <div className="bg-white flex flex-col text-sm">
      {comment &&
        comment
          .sort((a, b) => b.date.seconds - a.date.seconds)
          .map((comment, index) => (
            <div key={index} className="border-t px-4 py-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={comment.profileImage} className="rounded-full"></img>
                <p className="font-bold">{comment.name}</p>
                <p className="text-gray-500">{formattedDate(comment.date)}</p>
              </div>
              <pre className="mx-8 p-4 bg-gray-100 rounded-md whitespace-pre-wrap font-sans">
                {comment.comment}
              </pre>
            </div>
          ))}
    </div>
  );
};

export default CommentBox;
