import { motion } from "framer-motion";
import { Download, ExternalLink, FileSpreadsheet, X } from "lucide-react";
import { useState } from "react";

export default function MaintenanceScheduling() {
  const [loading] = useState(false);
  const [showWebViewer, setShowWebViewer] = useState(false);
  const excelFilePath = "/src/assets/แผนงานซ่อม FM-PC-13 (1).xlsx";
  const excelOnlineUrl =
    "https://1drv.ms/x/c/bb37c779b8faa0bc/IQB1IHRbeY6-T6raaWdYtOjqAcflSj9dC8du2cIDQxNg5Yc?e=3L5msf";

  const openExcelFile = async () => {
    try {
      // Download the file and open it
      const response = await fetch(excelFilePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "แผนงานซ่อม FM-PC-13.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error opening Excel file:", error);
      alert("ไม่สามารถเปิดไฟล์ Excel ได้");
    }
  };

  const openInOfficeViewer = () => {
    // Open the OneDrive Excel Online link directly
    window.open(excelOnlineUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">กำลังโหลดแผนงานซ่อม...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Web Viewer Modal */}
      {showWebViewer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWebViewer(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-sky-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center">
                  <FileSpreadsheet size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    แผนงานซ่อม FM-PC-13
                  </h3>
                  <p className="text-xs text-slate-500">
                    Microsoft Excel Viewer
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWebViewer(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Excel Viewer Content */}
            <div className="flex-1 overflow-hidden p-6 bg-slate-50">
              <div className="h-full bg-white rounded-xl border-2 border-slate-200 shadow-inner overflow-auto">
                <iframe
                  src={excelFilePath}
                  title="Excel Viewer"
                  className="w-full h-full"
                  style={{ border: "none" }}
                  onError={() => {
                    // Fallback: Show message if iframe doesn't work
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center">
              <div className="text-sm text-slate-600">
                <span className="font-semibold">💡 เคล็ดลับ:</span>{" "}
                คลิกที่เซลล์เพื่อดูข้อมูลโดยละเอียด
              </div>
              <button
                onClick={openExcelFile}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <Download size={16} />
                ดาวน์โหลด
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-2">
            แผนงานซ่อม FM-PC-13
          </h3>
          <p className="text-slate-600 text-lg">
            คลิกเพื่อเปิดไฟล์ใน Excel Online
          </p>
        </div>

        {/* Single Card - Excel Online */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-12 rounded-2xl hover:shadow-xl transition-all cursor-pointer"
            onClick={openInOfficeViewer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-sky-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <ExternalLink size={48} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">
                เปิดใน Excel Online
              </h4>
              <p className="text-slate-600 mb-6 text-lg">
                แก้ไขไฟล์ได้โดยตรงบน Microsoft Excel Online
              </p>
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                เปิดไฟล์ทันที
              </span>
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto"
        >
          <h5 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-sky-500" />
            ข้อมูลไฟล์
          </h5>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>ชื่อไฟล์:</span>
              <span className="font-semibold">แผนงานซ่อม FM-PC-13.xlsx</span>
            </div>
            <div className="flex justify-between">
              <span>สถานะ:</span>
              <span className="font-semibold text-green-600">พร้อมใช้งาน</span>
            </div>
            <div className="flex justify-between">
              <span>รูปแบบ:</span>
              <span className="font-semibold">Microsoft Excel Online</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
