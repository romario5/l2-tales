import UI from "./UI";

export default abstract class ContainableUI extends UI
{
    abstract get children() : UI[];
}