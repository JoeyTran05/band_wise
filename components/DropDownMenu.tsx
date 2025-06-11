import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const DropDownMenu = ({
	trigger,
	content,
	defaultValue,
}: DropDownMenuProps) => {
	return (
		<Accordion type="single" collapsible defaultValue={defaultValue}>
			<AccordionItem value="item-1">
				<AccordionTrigger>{trigger}</AccordionTrigger>
				<AccordionContent>{content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default DropDownMenu;
