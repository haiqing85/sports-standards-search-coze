import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

// PDF 生成器
export class PDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;
  private lineHeight: number;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
    this.lineHeight = 7;

    // 设置默认字体
    this.doc.setFont('helvetica');
  }

  // 添加标题
  addTitle(title: string) {
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    
    const lines = this.doc.splitTextToSize(title, this.pageWidth - 2 * this.margin);
    lines.forEach((line: string) => {
      this.checkPageBreak(this.lineHeight);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
    
    this.currentY += 5;
  }

  // 添加副标题
  addSubtitle(subtitle: string) {
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(100, 100, 100);
    
    const lines = this.doc.splitTextToSize(subtitle, this.pageWidth - 2 * this.margin);
    lines.forEach((line: string) => {
      this.checkPageBreak(this.lineHeight);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 3;
  }

  // 添加标签和值
  addField(label: string, value: string) {
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    
    this.checkPageBreak(this.lineHeight);
    this.doc.text(label + ':', this.margin, this.currentY);
    
    const labelWidth = this.doc.getTextWidth(label + ': ');
    this.doc.setFont('helvetica', 'normal');
    
    const valueLines = this.doc.splitTextToSize(value, this.pageWidth - 2 * this.margin - labelWidth);
    valueLines.forEach((line: string, index: number) => {
      if (index > 0) {
        this.currentY += this.lineHeight;
        this.checkPageBreak(this.lineHeight);
      }
      this.doc.text(line, this.margin + labelWidth, this.currentY);
    });
    
    this.currentY += this.lineHeight + 2;
  }

  // 添加分隔线
  addDivider() {
    this.currentY += 2;
    this.checkPageBreak(1);
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  // 添加段落
  addParagraph(title: string, content: string) {
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    
    this.checkPageBreak(this.lineHeight * 2);
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += this.lineHeight + 2;
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    
    const lines = this.doc.splitTextToSize(content, this.pageWidth - 2 * this.margin);
    lines.forEach((line: string) => {
      this.checkPageBreak(this.lineHeight);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
    
    this.currentY += 5;
  }

  // 添加长文本内容
  addContent(content: string) {
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    
    const paragraphs = content.split('\n').filter(p => p.trim());
    
    paragraphs.forEach((paragraph) => {
      const lines = this.doc.splitTextToSize(paragraph, this.pageWidth - 2 * this.margin);
      lines.forEach((line: string) => {
        this.checkPageBreak(this.lineHeight);
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += this.lineHeight;
      });
      this.currentY += 3;
    });
  }

  // 添加警告框
  addWarningBox(type: 'warning' | 'error', message: string) {
    this.currentY += 3;
    this.checkPageBreak(20);
    
    const startY = this.currentY;
    const boxHeight = 15;
    
    // 绘制背景
    if (type === 'warning') {
      this.doc.setFillColor(255, 243, 205);
      this.doc.setTextColor(133, 100, 4);
    } else {
      this.doc.setFillColor(248, 215, 218);
      this.doc.setTextColor(114, 28, 36);
    }
    
    this.doc.roundedRect(
      this.margin,
      startY,
      this.pageWidth - 2 * this.margin,
      boxHeight,
      2,
      2,
      'F'
    );
    
    // 添加文本
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(message, this.margin + 5, startY + 10);
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += boxHeight + 5;
  }

  // 添加页脚
  addFooter() {
    const pageCount = this.doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setTextColor(150, 150, 150);
      this.doc.text(
        `第 ${i} 页，共 ${pageCount} 页 | 体育标准查询系统 | 生成时间: ${new Date().toLocaleString()}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );
    }
  }

  // 检查是否需要分页
  private checkPageBreak(height: number) {
    if (this.currentY + height > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  // 生成并下载 PDF
  download(filename: string) {
    this.addFooter();
    this.doc.save(filename);
    toast.success('PDF 文件已成功生成并下载');
  }

  // 获取 Blob 对象（用于预览或其他用途）
  getBlob(): Blob {
    this.addFooter();
    return this.doc.output('blob');
  }

  // 获取 Data URL（用于预览）
  getDataURL(): string {
    this.addFooter();
    return this.doc.output('datauristring');
  }

  // 在新窗口打开预览
  openPreview() {
    this.addFooter();
    const pdfData = this.doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl, '_blank');
  }
}

// 生成标准文档 PDF
export function generateStandardPDF(standard: {
  title: string;
  number: string;
  typeName: string;
  status: string;
  department: string;
  publishDate: string;
  implementDate: string;
  category: string;
  subCategory: string;
  summary: string;
  content: string;
}) {
  const pdf = new PDFGenerator();
  
  // 标题
  pdf.addTitle(standard.title);
  pdf.addSubtitle(standard.number);
  
  pdf.addDivider();
  
  // 基本信息
  pdf.addField('标准类型', standard.typeName);
  pdf.addField('标准状态', standard.status);
  pdf.addField('发布部门', standard.department);
  pdf.addField('发布日期', standard.publishDate || '未公布');
  pdf.addField('实施日期', standard.implementDate || '未公布');
  pdf.addField('分类', `${standard.category} / ${standard.subCategory}`);
  
  pdf.addDivider();
  
  // 摘要
  if (standard.summary) {
    pdf.addParagraph('摘要', standard.summary);
    pdf.addDivider();
  }
  
  // 标准内容
  if (standard.content) {
    pdf.addParagraph('标准内容', standard.content);
  }
  
  // 状态提示
  if (standard.status === '废止') {
    pdf.addWarningBox('error', '注意：该标准已废止，相关内容仅供参考，请使用最新标准。');
  } else if (standard.status === '已修订') {
    pdf.addWarningBox('warning', '提示：该标准已有修订版，建议查阅最新版本以获取准确信息。');
  }
  
  // 下载
  const filename = `${standard.number}_${standard.title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '_')}.pdf`;
  pdf.download(filename);
  
  return pdf;
}

// 从 URL 下载真实 PDF 文件
export async function downloadRealPDF(url: string, filename: string): Promise<boolean> {
  try {
    toast.info('正在下载 PDF 文件...');
    
    // 使用 fetch 获取文件
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });
    
    if (!response.ok) {
      throw new Error('下载失败');
    }
    
    // 获取 Blob
    const blob = await response.blob();
    
    // 验证是否为 PDF
    if (blob.type !== 'application/pdf' && !url.endsWith('.pdf')) {
      toast.error('文件格式不正确，请确认是 PDF 文件');
      return false;
    }
    
    // 创建下载链接
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    
    toast.success('PDF 文件下载成功');
    return true;
  } catch (error) {
    console.error('PDF 下载失败:', error);
    toast.error('PDF 下载失败，请检查链接或网络连接');
    return false;
  }
}

// 合并多个 PDF（需要额外的库支持）
export async function mergePDFs(_urls: string[]): Promise<Blob | null> {
  // 这个功能需要额外的 PDF 处理库
  // 这里提供接口，实际实现需要安装 pdf-lib 等库
  toast.error('PDF 合并功能需要额外安装 pdf-lib 库');
  return null;
}
