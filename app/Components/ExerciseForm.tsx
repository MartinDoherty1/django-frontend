import React from 'react';
import Exercise from '../Models/Exercise';

interface Props {
    ExerciseBeingChanged: Exercise | null,
    handleSubmitMethod: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChangeMethod: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function ExerciseForm({ ExerciseBeingChanged, handleChangeMethod, handleSubmitMethod }: Props) {
    return (
        <div className="p-6 space-y-6">
            <form id='exercise-form' onSubmit={handleSubmitMethod}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="exercise_name" className="text-sm font-medium text-gray-900 block mb-2">Exercise Name</label>
                        <input type='text' placeholder='Exercise Name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required  id="exercise_name" name="exercise_name" maxLength={50} value={ExerciseBeingChanged?.exercise_name ?? ''} onChange={handleChangeMethod}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                        <input type='text' placeholder='Description' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required  id="description" name="description" maxLength={300} value={ExerciseBeingChanged?.description ?? ''} onChange={handleChangeMethod}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="body_part" className="text-sm font-medium text-gray-900 block mb-2">Body Part</label>
                        <input type='text' placeholder='Body Part' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required id="body_part" name="body_part" maxLength={5} value={ExerciseBeingChanged?.body_part ?? ''} onChange={handleChangeMethod}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="type" className="text-sm font-medium text-gray-900 block mb-2">Exercise Type</label>
                        <select id="type" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={handleChangeMethod} value={ExerciseBeingChanged?.type ?? ''}>
                            <option disabled value="">-- Select an option --</option>
                            <option value="BB">Barbell (BB)</option>
                            <option value="BW">Body Weight (BW)</option>
                            <option value="DB">Dumbbell (DB)</option>
                            <option value="CAB">Cable (CAB)</option>
                        </select>
                    </div>

                </div>
            </form>
    </div>
    );
};

export default ExerciseForm;