import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import NewTaskModal from "./NewTaskModal";

const API_BASE_URL = 'http://localhost:5000';

const PrevWeek = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/tasks`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError(error.message);
            }
        };

        fetchTasks();
    }, []);

    const getPrevWeekRange = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfPrevWeek = new Date(today.setDate(today.getDate() - currentDay - 7)); // Start of previous week
        const endOfPrevWeek = new Date(today.setDate(startOfPrevWeek.getDate() + 6)); // End of previous week
        return { startOfPrevWeek, endOfPrevWeek };
    };

    const getTasksForPrevWeek = () => {
        const { startOfPrevWeek, endOfPrevWeek } = getPrevWeekRange();
        return tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= startOfPrevWeek && dueDate <= endOfPrevWeek;
        });
    };

    const filteredTasks = getTasksForPrevWeek();

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Card className="w-[25vw]">
                <CardHeader>
                    <CardTitle className="text-lg">Last Week</CardTitle>
                    <CardDescription>
                        <div className="mt-4 w-1/2 bg-white text-blue-500 border border-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                            <NewTaskModal />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="completed-tasks">
                                <AccordionTrigger className="text-md">Completed</AccordionTrigger>
                                <AccordionContent>
                                    {filteredTasks.filter(task => task.isCompleted).map(task => (
                                        <div key={task._id} className="p-2 border-b">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={task.isCompleted}
                                                readOnly
                                            />
                                            <p><strong>Title:</strong> {task.title}</p>
                                            <p><strong>Description:</strong> {task.desc}</p>
                                            <p><strong>Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="created-tasks">
                                <AccordionTrigger className="text-md">Created</AccordionTrigger>
                                <AccordionContent>
                                    {filteredTasks.map(task => (
                                        <div key={task._id} className="p-2 border-b">
                                            <p><strong>Title:</strong> {task.title}</p>
                                            <p><strong>Description:</strong> {task.desc}</p>
                                            <p><strong>Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="deleted-tasks">
                                <AccordionTrigger className="text-md">Deleted</AccordionTrigger>
                                <AccordionContent>
                                    {/* Assuming you have some way to mark tasks as deleted; otherwise, show all filtered tasks */}
                                    {filteredTasks.map(task => (
                                        <div key={task._id} className="p-2 border-b">
                                            <p><strong>Title:</strong> {task.title}</p>
                                            <p><strong>Description:</strong> {task.desc}</p>
                                            <p><strong>Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </CardContent>
                <CardFooter>
                    {/* Footer content */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default PrevWeek;
