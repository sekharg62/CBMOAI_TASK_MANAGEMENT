
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { useState } from "react";
import NewTaskModal from "./NewTaskModal";

const PrevWeek = () => {


    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <Card className="w-[25vw]">
                <CardHeader>
                    <CardTitle className="text-lg">Last Week</CardTitle>
                    <CardDescription>
                    <div className=" mt-4 w-1/2 bg-white text-blue-500 border border-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                        <NewTaskModal />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md">Completed()</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex gap-3 align-middle">
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className={isChecked ? "line-through" : ""}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores dicta in eum corporis voluptates consequatur </span>
                                            <span className=" w-1/2 border border-s-violet-100 rounded-full px-6 py-1">
                                                Date
                                            </span>

                                            <div className=" flex gap-3">
                                            <span className=" rounded-full w-1/3 px-4 px- py-1 bg-gray-200">Labels</span>
                                            <span className=" rounded-full w-1/3 px-4 px- py-1 bg-gray-200">Labels</span>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md">Created()</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md">Deleted()</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>

        </div>
    )
}

export default PrevWeek
