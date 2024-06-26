import { IPieData } from "@models/pie_donut.interfaces";

export class PieHelper {
  static convert(data: any, title: string, valueAttr: string, idAttr: string, labelAttr: string): IPieData {

    const pieData = (data || []).map((elem: any) => ({
      id: elem[idAttr],
      label: elem[labelAttr],
      value: elem[valueAttr]
    }));

    return {
      title,
      data: pieData
    }
  }
}
