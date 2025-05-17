---
permalink: /
title: "Haonan Wang (王浩楠)"
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}


<span class='anchor' id='about-me'></span>

<!--
<img alt="last updated" src="https://img.shields.io/github/last-commit/McGregorWwww/mcgregorwwww.github.io?color=e8e8e8&label=Last%20Updated&logo=Convertio&logoColor=white&style=flat-square&labelColor=gray">  &nbsp;


<img src="https://visitor-badge-reloaded.herokuapp.com/badge?page_id=mcgregorwwww.github.io&lcolor=gray&color=e8e8e8&style=flat-square&cache=on&logo=Myspace"> 
-->


# Biography

<div markdown="1" style="font-size:17px">

I am a Ph.D. student supervised by [Prof. Xiaomeng Li](https://xmengli.github.io/) at [The Hong Kong University of Science and Technology](https://hkust.edu.hk/).

Before that, I received my Master's degree from [The University of Hong Kong](https://www.hku.hk/) and my B.Eng degree from [Northeastern University](http://www.neu.edu.cn/) supervised by [Prof. Peng Cao](https://scholar.google.com/citations?user=0OfgZSsAAAAJ&hl=en).

<!--**Google scholar info**: &nbsp; <a href='https://scholar.google.com/citations?user=KDNRnW0AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Moleculer&color=e8e8e8&style=flat-square&label=Total%20Citations&labelColor=CCCCCC&logoColor=black"></a>-->

---

</div>



<div markdown="1" style="font-size:14px">


**Research interest:**

- Deep Learning
- Computer Vision
- Self-/Semi-/Weakly-supervised Learning
- Medical Image Analysis
- Foundation Models
- Brain Decoding
- Generative Models

</div>



<!--<div markdown="1" style="font-size:14px">-->

<!-- **Curriculum Vitae**: &nbsp; <a href='./static/resume.pdf'><img alt="" src="https://img.shields.io/badge/Download-CCCCCC?style=flat-square&logo=docusign&logoColor=black"></a> -->

<!-- **Skills**: &nbsp; Python, C++, Pytorch, Keras, CUDA, MMCV -->

<!--</div>-->


<br/>




# News

<div markdown="1" style="height: 240px; overflow: auto; font-size:14px">

![Static Badge](https://img.shields.io/badge/2025%2F03-silver?style=flat-square) &nbsp; New attempt in Brain Decoding: [*Neurons: Emulating the Human Visual Cortex Improves Fidelity and Interpretability in fMRI-to-Video Reconstruction*](https://arxiv.org/abs/2503.11167)

![Static Badge](https://img.shields.io/badge/2025%2F01-silver?style=flat-square) &nbsp; One co-authored paper accepted by _**ICLR-2025**_.

![Static Badge](https://img.shields.io/badge/2024%2F10-silver?style=flat-square) &nbsp; Take a look at our new work on Generic Semi-supervised Medical Image Segmentation: [_S&D Messenger: Exchanging Semantic and Domain Knowledge for Generic Semi-Supervised Medical Image Segmentation_](https://arxiv.org/abs/2407.07763). We established new SOTAs on **six** benchmark datasets! 🌟

![Static Badge](https://img.shields.io/badge/2024%2F10-silver?style=flat-square) &nbsp; One co-authored paper accepted by _**TMI-2024**_.

![Static Badge](https://img.shields.io/badge/2024%2F02-silver?style=flat-square) &nbsp; One paper accepted by _**CVPR-2024**_.

![Static Badge](https://img.shields.io/badge/2023%2F09-silver?style=flat-square)
 &nbsp; One paper accepted by _**NeurIPS-2023**_.
 
![Static Badge](https://img.shields.io/badge/2023%2F08-silver?style=flat-square) &nbsp; Join [Prof. Xiaomeng Li](https://xmengli.github.io/)'s lab at HKUST to pursue my Ph.D. degree.

![Static Badge](https://img.shields.io/badge/2023%2F06-silver?style=flat-square) &nbsp; One paper accepted by _**MICCAI-2023**_.

![Static Badge](https://img.shields.io/badge/2022%2F02-silver?style=flat-square) &nbsp; One paper accepted by _**AAAI-2022**_. 

</div>


---
<br/>


# Publications
$^\dagger$ denotes equal contribution.
## Featured Publications

<style>
.filter-buttons {
  margin-bottom: 5px;
  text-align: center;
}
.filter-button {
  display: inline-block;
  padding: 5px 10px;
  margin: 3px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 0px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}
.filter-button:hover {
  background-color: #f0f0f0;
}
.filter-button.active {
  background-color: #000;
  color: white;
  border-color: #000;
}
.publication-tag {
  display: inline-block;
  padding: 2px 6px;
  margin: 2px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 0px;
  font-size: 10px;
  color: #000;
}

/* Animation styles */
.paper-box {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.paper-box.fade-out {
  opacity: 0;
  transform: translateY(10px);
}
.paper-box.fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>

<div class="filter-buttons">
<span class="filter-button" data-filter="brain">Brain Decoding</span>
  <span class="filter-button" data-filter="foundation">Foundation Models / VLMs</span>
  <span class="filter-button" data-filter="label-efficient">Label-efficient Learning</span>
<span class="filter-button" data-filter="seg">Segmentation</span>
  <span class="filter-button" data-filter="interpret">Interpretability</span>
 <span class="filter-button active" data-filter="all">All</span>
</div>




<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">Arxiv 2025</div><a href='images/UniEval.png'><img src='images/UniEval.png' alt="UniEval" width="100%"></a>
</div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="foundation">
  
[**UniEval: Unified Holistic Evaluation for Unified Multimodal Understanding and Generation**](https://www.arxiv.org/abs/2505.10483) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>-->
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/UniEval?style=social">

<div markdown="1" style="font-size:13px">
_Arxiv Preprints_, 2025

Yi Li, **Haonan Wang**, Qixiang Zhang, Boyu Xiao, Chenchang Hu, Hualiang Wang, Xiaomeng Li
  
 <a href="https://github.com/xmed-lab/UniEval"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <a href="https://xmed-lab.github.io/UniEval/"><img src="https://img.shields.io/badge/Website-100000?style=for-the-badge&logoColor=white" alt="Website" /></a>
</div>
</div>
</div>






<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">Arxiv 2025</div><a href='images/xmedgpt.png'><img src='images/xmedgpt.png' alt="XMedGPT" width="100%"></a>
</div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="foundation interpret">
  
[**Multi-Modal Explainable Medical AI Assistant for Trustworthy Human-AI Collaboration**](https://arxiv.org/abs/2505.06898) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <!--<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/RCMed?style=social">-->

<div markdown="1" style="font-size:13px">
_Arxiv Preprints_, 2025

Honglong Yang, Shanshan Song, Yi Qin, Lehan Wang, **Haonan Wang**, Xinpeng Ding, Qixiang Zhang, Bodong Du, Xiaomeng Li
  
 <!-- <a href="https://github.com/xmed-lab/RCMed"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <a href="https://xmed-lab.github.io/RCMed"><img src="https://img.shields.io/badge/Homepage-100000?style=for-the-badge&logo=htmx&logoColor=white" alt="Homepage" /></a> -->
</div>
</div>
</div>



<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">Arxiv 2025</div><a href='images/RCMed.png'><img src='images/RCMed.png' alt="RCMed" width="100%"></a>
</div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="foundation seg">
  
[**Reinforced Correlation Between Vision and Language for Precise Medical AI Assistant**](https://arxiv.org/abs/2505.03380) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/RCMed?style=social">

<div markdown="1" style="font-size:13px">
_Arxiv Preprints_, 2025

**Haonan Wang**, Jiaji Mao, Lehan Wang, Qixiang Zhang, Marawan Elbatel, Yi Qin, Huijun Hu, Baoxun Li, Wenhui Deng, Weifeng Qin, Hongrui Li, Jialin Liang, Jun Shen, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/RCMed"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <a href="https://xmed-lab.github.io/RCMed"><img src="https://img.shields.io/badge/Website-100000?style=for-the-badge&logoColor=white" alt="Website" /></a>
</div>
</div>
</div>


<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">Arxiv 2025</div><a href='images/Neurons.png'><img src='images/Neurons.png' alt="Neurons" width="100%"></a>
</div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="brain interpret ">
  
[**Neurons: Emulating the Human Visual Cortex Improves Fidelity and Interpretability in fMRI-to-Video Reconstruction**](https://arxiv.org/abs/2503.11167) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/NEURONS?style=social">

<div markdown="1" style="font-size:13px">
_Arxiv Preprints_, 2025

**Haonan Wang**, Qixiang Zhang, Lehan Wang, Xuanqi Huang, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/NEURONS"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> 
</div>
</div>
</div>



<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">ICLR 2025</div><a href='images/MedRegA.png'><img src='images/MedRegA.png' alt="MedRegA" width="100%"></a>
<!--<a href='images/allspark.png'><img src='images/allspark.png' alt="allspark_framework" width="100%"></a>--></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="foundation interpret">
  
[**Interpretable Bilingual Multimodal Large Language Model for Diverse Biomedical Tasks**](https://arxiv.org/abs/2410.18387) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/MedRegA?style=social">

<div markdown="1" style="font-size:13px">
_The Thirteenth International Conference on Learning Representations (**ICLR**)_, 2025

Lehan Wang, **Haonan Wang**, Honglong Yang, Jiaji Mao, Zehong Yang, Jun Shen, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/MedRegA"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> 
</div>
</div>
</div>




<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">Arxiv 2024</div><a href='images/SND.png'><img src='images/SND.png' alt="SND" width="100%"></a>
<!--<a href='images/allspark.png'><img src='images/allspark.png' alt="allspark_framework" width="100%"></a>--></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg label-efficient">
  
[**S&D Messenger: Exchanging Semantic and Domain Knowledge for Generic Semi-Supervised Medical Image Segmentation**](https://arxiv.org/abs/2407.07763) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/SD-Messenger?style=social">

<div markdown="1" style="font-size:13px">
_Arxiv Preprints_, 2024

Qixiang Zhang $^\dagger$, **Haonan Wang** $^\dagger$, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/SD-Messenger"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <!--<a href="https://www.youtube.com/watch?v=Zebw47uPBFc"><img src="https://img.shields.io/badge/Video-100000?style=for-the-badge&logo=youtube&logoColor=white" alt="" /></a>  -->

</div>
</div>
</div>



<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">TMI 2024</div><a href='images/GlandSAM.png'><img src='images/GlandSAM.png' alt="GlandSAM" width="100%"></a>
<!--<a href='images/allspark.png'><img src='images/allspark.png' alt="allspark_framework" width="100%"></a>--></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg label-efficient">
  
[**GlandSAM: Injecting Morphology Knowledge into Segment Anything Model for Label-free Gland Segmentation**](https://ieeexplore.ieee.org/abstract/document/10707661/) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <!--<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/AllSpark?style=social"> -->

<div markdown="1" style="font-size:13px">
_IEEE Transactions on Medical Imaging_ (***TMI***), 2024

Qixiang Zhang, Yi Li, Cheng Xue, **Haonan Wang**, Xiaomeng Li
  
<!--<a href="https://github.com/xmed-lab/AllSpark"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <a href="https://www.youtube.com/watch?v=Zebw47uPBFc"><img src="https://img.shields.io/badge/Video-100000?style=for-the-badge&logo=youtube&logoColor=white" alt="" /></a>  -->

</div>
</div>
</div>


<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">CVPR 2024</div><a href='images/allspark.jpg'><img src='images/allspark.jpg' alt="allspark" width="80%"></a>
<!--<a href='images/allspark.png'><img src='images/allspark.png' alt="allspark_framework" width="100%"></a>--></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg label-efficient">
  
[**_AllSpark_: Reborn Labeled Features from Unlabeled in Transformer for
Semi-Supervised Semantic Segmentation**](https://arxiv.org/abs/2403.01818) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/AllSpark?style=social"> 

<div markdown="1" style="font-size:13px">
_IEEE / CVF Conference on Computer Vision and Pattern Recognition_ (***CVPR***), 2024

**Haonan Wang** $^\dagger$, Qixiang Zhang $^\dagger$, Yi Li, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/AllSpark"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> <a href="https://www.youtube.com/watch?v=Zebw47uPBFc"><img src="https://img.shields.io/badge/Video-100000?style=for-the-badge&logo=youtube&logoColor=white" alt="" /></a> 



</div>
</div>
</div>


<div class='paper-box'><div class='paper-box-image' style="text-align:center"><div><div class="badge" background-color="000000">NeurIPS 2023</div><a href='images/AND.png'><img src='images/AND.png' alt="AND" width="100%"></a></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg label-efficient">

[**Towards Generic Semi-Supervised Framework for Volumetric Medical Image Segmentation**](https://proceedings.neurips.cc/paper_files/paper/2023/hash/05dc08730e32441edff52b0fa6caab5f-Abstract-Conference.html) <!--<span class='show_paper_citations' data='KDNRnW0AAAAJ:u-x6o8ySG0sC'></span>--> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/GenericSSL?style=social">

<div markdown="1" style="font-size:13px">
_Advances in Neural Information Processing Systems_ (***NeurIPS***), 2023

**Haonan Wang**, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/GenericSSL"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> 
<a href="https://www.bilibili.com/video/BV1VQ4y1h7VA/?spm_id_from=333.999.0.0&vd_source=99138e8188d50ba1501059078ab79ca5"><img src="https://img.shields.io/badge/Video-100000?style=for-the-badge&logo=bilibili&logoColor=white" alt="" /></a>
<a href="https://hkustconnect-my.sharepoint.com/:b:/g/personal/hwanggr_connect_ust_hk/EQ62bNBRfvVCgP2mVdAJ2yUBN7qTeIJUVFgmEzy2EeOUwA?e=qcxGvH"><img src="https://img.shields.io/badge/Slides-100000?style=for-the-badge&logo=microsoftpowerpoint&logoColor=white" alt="" /></a>


</div>
</div>
</div>


<div class='paper-box'><div class='paper-box-image'><div><div class="badge" background-color="000000">MICCAI 2023</div><a href='images/DHC.png'><img src='images/DHC.png' alt="DHC" width="100%"></a></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg label-efficient">
  
[**DHC: Dual-debiased Heterogeneous Co-training Framework for Class-imbalanced Semi-supervised Medical Image Segmentation**](https://arxiv.org/abs/2307.11960) <span class='show_paper_citations' data='KDNRnW0AAAAJ:Tyk-4Ss8FVUC'></span> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xmed-lab/DHC?style=social">

<div markdown="1" style="font-size:13px">

_Medical Image Computing and Computer Assisted Intervention_ (**_MICCAI_**), 2023

**Haonan Wang**, Xiaomeng Li
  
<a href="https://github.com/xmed-lab/DHC"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> 
  
</div>
</div>
</div>


<div class='paper-box'><div class='paper-box-image'><div><div class="badge" background-color="000000">AAAI 2022</div><a href='images/UCTransNet.png'><img src='images/UCTransNet.png' alt="UCTransNet" width="100%"></a></div></div>
<div class='paper-box-text' markdown="1" style="font-size:14px" data-categories="seg">
  
[**UCTransNet: Rethinking the Skip Connections in U-Net from a Channel-wise Perspective with Transformer**](https://ojs.aaai.org/index.php/AAAI/article/view/20144) <span class='show_paper_citations' data='KDNRnW0AAAAJ:2osOgNQ5qMEC'></span> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mcgregorwwww/uctransnet?style=social">

<div markdown="1" style="font-size:13px">

_36th AAAI Conference on Artificial Intelligence_ (_**AAAI**_), 2022

[🏅 Top-1 Most Influential AAAI 2022 Paper](https://www.paperdigest.org/2024/05/most-influential-aaai-papers-2024-05/)

**Haonan Wang**, Peng Cao, Jiaqi Wang, Osmar R. Zaiane
  
<a href="https://github.com/McGregorWwww/UCTransNet"><img src="https://img.shields.io/badge/Code-100000?style=for-the-badge&logo=github&logoColor=white" alt="" /></a> 
<a href="https://www.bilibili.com/video/BV1ZF411p7PM?spm_id_from=333.999.0.0"><img src="https://img.shields.io/badge/Video-100000?style=for-the-badge&logo=bilibili&logoColor=white" alt="" /></a>
  
</div>
</div>
</div>


## Full Publication List

For a complete list of publications, please refer to my [Google Scholar](https://scholar.google.com/citations?user=KDNRnW0AAAAJ).



<!--
# Honors and Awards
- *2018.12* &nbsp; Outstanding Students of Northeastern University.
- *2018.12* &nbsp; First Class Scholarship of Northeastern University.
{{ ... }}

---
<br/>
-->



# Educations
- *2023.09 -  &emsp;&emsp;&emsp;&nbsp;&nbsp;* &nbsp; Ph.D. student, HKUST. 
- *2022.09 - 2023.09* &nbsp; Master's student, Computer Science, HKU. 
- *2017.09 - 2021.06* &nbsp; B.Eng, Computer Science, Northeastern University. 

---
<br/>

# Professional Activities
## Journal Reviews
- IEEE Transactions on Neural Networks and Learning Systems (TNNLS)
- IEEE Transactions on Medical Imaging (TMI)
- IEEE Journal of Biomedical and Health Informatics (JBHI)

## Conference Reviews
- IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)
- International Conference on Computer Vision (ICCV)
- Conference on Neural Information Processing Systems (NeurIPS)
- AAAI Conference on Artificial Intelligence (AAAI)
- Medical Image Computing and Computer Assisted Intervention (MICCAI)


---
<br/>
<br/>

<div style="height:1px; background-color:Black"></div>
<br/>

<div>
<div style="margin-left: 10%; width: 70%">
<script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=080808&w=a&t=tt&d=ELDMpSQtbqCvD6euvyQWCsPttHSZd2FQHAPbrBGh0aA&co=ffffff&cmo=c93131&cmn=00b6ff&ct=808080'></script>
</div>
</div>
<br/>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and publications
    const filterButtons = document.querySelectorAll('.filter-button');
    const publications = document.querySelectorAll('.paper-box');
    
    // Create a counter for each category
    const categoryCounts = {
      'brain': 0,
      'foundation': 0,
      'label-efficient': 0,
      'seg': 0,
      'interpret': 0,
      'all': 0
    };
    
    // Count total publications
    categoryCounts['all'] = publications.length;
    
    // Generate tags for each publication based on data-categories and count categories
    publications.forEach(pub => {
      const paperText = pub.querySelector('.paper-box-text');
      const categoriesAttr = paperText.getAttribute('data-categories');
      
      if (categoriesAttr) {
        // Get categories and create a map for display names
        const categories = categoriesAttr.split(' ').filter(cat => cat.trim() !== '');
        const categoryDisplayNames = {
          'brain': 'Brain Decoding',
          'foundation': 'Foundation Models / VLMs',
          'label-efficient': 'Label-efficient Learning',
          'seg': 'Segmentation',
          'interpret': 'Interpretability'
        };
        
        // Count each category
        categories.forEach(category => {
          if (categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
          }
        });
        
        // Find or create tags container
        let tagsContainer = paperText.querySelector('.publication-tags');
        if (!tagsContainer) {
          // Create tags container at the end of the paper-box-text
          tagsContainer = document.createElement('div');
          tagsContainer.className = 'publication-tags';
          tagsContainer.style.marginTop = '5px';
          
          // Append at the end of paper-box-text
          paperText.appendChild(tagsContainer);
        } else {
          // Clear existing tags
          tagsContainer.innerHTML = '';
        }
        
        // Add tags to container
        if (tagsContainer) {
          categories.forEach(category => {
            const tag = document.createElement('span');
            tag.className = 'publication-tag';
            tag.textContent = categoryDisplayNames[category] || category;
            tagsContainer.appendChild(tag);
          });
        }
      }
    });
    
    // Update filter button text with counts
    filterButtons.forEach(button => {
      const filterValue = button.getAttribute('data-filter');
      const count = categoryCounts[filterValue] || 0;
      const originalText = button.textContent.split('(')[0].trim(); // Get text without count
      button.textContent = `${originalText} (${count})`;
      
      // Add click event to each filter button
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // First, collect which publications should be shown or hidden
        const toShow = [];
        const toHide = [];
        
        publications.forEach(pub => {
          const categories = pub.querySelector('.paper-box-text').getAttribute('data-categories');
          
          if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
            toShow.push(pub);
          } else {
            toHide.push(pub);
          }
        });
        
        // First hide all papers to reset the view
        publications.forEach(pub => {
          if (!toShow.includes(pub)) {
            // Immediately hide papers not in the current filter
            pub.style.display = 'none';
          } else {
            // For papers that will be shown, prepare them for animation
            // by making them invisible but keeping them in the layout
            pub.style.opacity = '0';
            pub.classList.remove('fade-in');
            pub.classList.add('fade-out');
            pub.style.display = '';
          }
        });
        
        // Force reflow to ensure the fade-out state is applied before transitioning
        void document.body.offsetWidth;
        
        // Start staggered fade-in animation for all papers in the current filter
        const staggerDelay = 80; // Delay between each paper's animation (in ms)
        
        toShow.forEach((pub, index) => {
          // Use setTimeout to create the staggered effect
          setTimeout(() => {
            pub.classList.remove('fade-out');
            pub.classList.add('fade-in');
            pub.style.opacity = ''; // Remove the explicit opacity setting
            
            // Remove the fade-in class after animation completes
            setTimeout(() => {
              pub.classList.remove('fade-in');
            }, 300);
          }, index * staggerDelay);
        });
      });
    });
    
    // Handle citation counts
    const citationElements = document.querySelectorAll('.show_paper_citations');
    
    // Function to create citation badge
    function createCitationBadge(count, isLoading = false) {
      const citationBadge = document.createElement('span');
      citationBadge.className = 'citation-badge';
      citationBadge.style.display = 'inline-block';
      citationBadge.style.padding = '1px 5px';
      citationBadge.style.margin = '0 5px';
      citationBadge.style.backgroundColor = '#f5f5f5';
      citationBadge.style.color = '#333';
      citationBadge.style.borderRadius = '3px';
      citationBadge.style.fontSize = '12px';
      citationBadge.style.fontWeight = 'normal';
      
      if (isLoading) {
        citationBadge.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
      } else {
        citationBadge.innerHTML = `<i class="fas fa-quote-right"></i> ${count}`;
      }
      
      return citationBadge;
    }
    
    // Citation fetching using Google Scholar data from JSON file
    async function fetchCitation(paperTitle, element, scholarId) {
      try {
        // Show loading badge initially
        const loadingBadge = createCitationBadge('', true);
        element.parentNode.insertBefore(loadingBadge, element.nextSibling);
        
        if (!scholarId) {
          loadingBadge.innerHTML = `<i class="fas fa-quote-right"></i> -`;
          return;
        }
        
        // Fetch the Google Scholar data from the JSON file generated by the GitHub Action
        try {
          const response = await fetch('/google_scholar_crawler/results/gs_data.json');
          if (response.ok) {
            const scholarData = await response.json();
            
            if (scholarData && scholarData.publications && scholarData.publications[scholarId]) {
              // Get citation count for this specific paper
              const pub = scholarData.publications[scholarId];
              // Google Scholar data format has 'num_citations' field
              const count = pub.num_citations || 0;
              
              // Replace loading badge with citation count
              const citationBadge = createCitationBadge(count);
              element.parentNode.replaceChild(citationBadge, loadingBadge);
              console.log(`Loaded citation count from Google Scholar: ${scholarId} -> ${count}`);
              return;
            }
          }
        } catch (error) {
          console.log('Error fetching Google Scholar data:', error);
        }
        
        // If Google Scholar data isn't available, try Semantic Scholar as fallback
        try {
          const semanticUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(paperTitle)}&limit=1&fields=citationCount,title`;
          const semanticResponse = await fetch(semanticUrl);
          
          if (semanticResponse.ok) {
            const semanticData = await semanticResponse.json();
            if (semanticData.data && semanticData.data.length > 0) {
              const paper = semanticData.data[0];
              const count = paper.citationCount || 0;
              const citationBadge = createCitationBadge(count);
              element.parentNode.replaceChild(citationBadge, loadingBadge);
              return;
            }
          }
        } catch (fallbackError) {
          console.log('Fallback API also failed:', fallbackError);
        }
        
        // If all fails, show a dash
        loadingBadge.innerHTML = `<i class="fas fa-quote-right"></i> -`;
      } catch (error) {
        console.error('Error handling citation:', error);
        // Show dash in case of any unexpected error
        if (loadingBadge && loadingBadge.parentNode) {
          loadingBadge.innerHTML = `<i class="fas fa-quote-right"></i> -`;
        }
      }
    }
    
    // Map of paper IDs to titles
    const paperTitles = {
      'KDNRnW0AAAAJ:2osOgNQ5qMEC': 'UCTransNet: Rethinking the Skip Connections in U-Net from a Channel-wise Perspective with Transformer',
      'KDNRnW0AAAAJ:Tyk-4Ss8FVUC': 'DHC: Dual-debiased heterogeneous co-training framework for class-imbalanced semi-supervised medical image segmentation'
    };
    
    // Process each citation element directly when page loads
    citationElements.forEach(element => {
      const scholarId = element.getAttribute('data');
      if (scholarId && paperTitles[scholarId]) {
        fetchCitation(paperTitles[scholarId], element, scholarId);
      }
    });
  });
</script>

<div style="height:2px; background-color:Black"></div>
<br/>
