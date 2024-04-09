import React, {FC} from 'react';
import Link from 'next/link';

interface Props {
    h1Text: string,
    linkText: string,
    link: string
}

const ErrorWithExerciseMutation: FC<Props> = ({ h1Text, linkText, link }) => {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">{h1Text}</h1>
                <p className="text-gray-600 mb-6"></p>
                <Link href={link} className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">{linkText}</Link>
            </div>
        </div>
    );
};

export default ErrorWithExerciseMutation;