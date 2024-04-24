export interface ResultadosMontoPromedio {
    tipo: string;
    monto: number;
}

export interface TarjetasReporteGeneral {
    [year: string]: {
        Monto: number;
        "Número de Obras": number;
    }
}

export interface GraficaOrigenFondo {
    year: number;
    Copladem: number;
    Municipal: number;
    Isn: number;
    "Fondo metro": number;
    Fortalecimiento: number;
}

export interface GraficaContratistaItem {
    Contratista: string;
    Monto: number;
}

export interface GraficaContratistaTotal {
    restringida: GraficaContratistaItem[];
}
export interface CasosContratistaTotal {
    restringida: string;
    directa: string;
    publica: string;
    total: string;
}

export interface GraficaContratistaAnualItem {
    Contratista: string;
    Monto: number;
    monto_publica: number;
    monto_directa: number;
    monto_restringida: number;
}

export interface GraficaContratistaAnual {
    [year: string]: GraficaContratistaAnualItem[];
}

export interface CasosContratistaAnual {
    [year: string]: string;
}

export interface GraficaScatterContratistas {
    contratista: string;
    monto: number;
    obras: number;
}

export interface GraficaScatterColonias {
    monto: number;
    obras: number;
    colonia: string;
}

export interface GraficaLicitacionAnual {
    categoria: string;
    fecha: number;
    dato: number;
}

export interface GraficaTipoObraAnual {
    categoria: string;
    fecha: number;
    dato: number;
}

export interface TablaEficienciaSimas {
    [month: string]: {
        "No. DE USUARIOS": number;
        "EFICIENCIA FISICA ": number;
        Colonias: string;
    }
}

export interface TablaObrasSimas {
    [year: string]: {
        "AGUA POTABLE": number;
        "AGUAS RESIDUALES": number;
        CONEXIONES: number;
        Costo: number;
        Mes: string;
    }
}

export interface GraficaReportesAguapotable {
    trabajo_realizado: string;
    numero_reportes: number;
}

export interface GraficaReportesAguasresiduales {
    trabajo_realizado: string;
    numero_reportes: number;
}

export interface GraficaReportesConexciones {
    trabajo_realizado: string;
    numero_reportes: number;
}

export interface GraficaObrasMontoSimas {
    year: number;
    obras: number;
    monto: number;
}

export interface GraficaReportesResumen {
    fecha: string;
    dato: number;
    categoria: string;
}

export interface GraficaResumenSimas {
    [year: string]: {
        "Tipo obras": string;
        Costo: number;
    }

}

export interface ReporteSimas {
    montoPromedio: ResultadosMontoPromedio[];
    tarjetas_reporte_general: TarjetasReporteGeneral;
    grafica_origen_fondo: GraficaOrigenFondo[];
    grafica_contratista_total: GraficaContratistaTotal;
    casos_contratista_total: CasosContratistaTotal;
    casos_origen_fondo: string;
    grafica_contratista_anual: GraficaContratistaAnual;
    casos_contratista_anual: CasosContratistaAnual;
    grafica_scatter_contratistas: GraficaScatterContratistas[];
    grafica_scatter_colonias: GraficaScatterColonias[];
    grafica_licitacion_anual: GraficaLicitacionAnual[];
    grafica_tipo_obra_anual: GraficaTipoObraAnual[];
    tabla_eficiencia_simas: TablaEficienciaSimas;
    tabla_obras_simas: TablaObrasSimas;
    grafica_reportes_aguapotable: GraficaReportesAguapotable[];
    grafica_reportes_aguasresiduales: GraficaReportesAguasresiduales[];
    grafica_reportes_conexciones: GraficaReportesConexciones[];
    grafica_obras_monto_simas: GraficaObrasMontoSimas[];
    grafica_reportes_resumen: GraficaReportesResumen[];
    grafica_resumen_simas: GraficaResumenSimas;
}