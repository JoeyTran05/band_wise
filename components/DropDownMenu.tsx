import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const DropDownMenu = ({
	trigger,
	content,
	value,
	defaultValue,
}: DropDownMenuProps) => {
	return (
		<Accordion
			type="single"
			collapsible
			value={value}
			defaultValue={defaultValue}
		>
			<AccordionItem value="item-1">
				<AccordionTrigger>{trigger}</AccordionTrigger>
				<AccordionContent>{content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default DropDownMenu;
